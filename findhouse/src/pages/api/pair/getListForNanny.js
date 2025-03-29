import { Pool } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

// 連線池設定
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  const { page = 1, pageSize = 10, keywords, sort, locations, status } = req.query;
  const token = req.cookies.authToken;
  const payload = await verifyToken(token);
  const userId = payload.userId;

  // Query to get memberId using userId
  const memberIdQuery = `
    SELECT nanny.id FROM nanny left join member on nanny.memberid::bigint = member.id WHERE member.line_id = $1;
  `;
  const memberIdResult = await pool.query(memberIdQuery, [userId]);
  console.log(memberIdResult);

  if (memberIdResult.rowCount === 0) {
    return res.status(200).json({ 
      success: true, 
      nannyProfile: [], 
      pageCount: 0
    });
  }

  const memberId = memberIdResult.rows[0].id;
  console.log('memberId:',memberId);

  console.log('locations:',locations);
  
  if (!userId) {
    return res.status(400).json({ success: false, message: 'ID parameter is required' });
  }

  // Ensure page is at least 1
  const currentPage = Math.max(1, parseInt(page));
  const offset = (currentPage - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);

  let orderByClause = '';
  if (sort === 'time') {
    orderByClause = 'o.created_ts DESC';
  }
  if (sort === 'rating') {
    orderByClause = 'n.score DESC';
  }

  try {
    const client = await pool.connect();
    const locationArray = locations ? locations.split(",") : null;
    console.log('locationArray:',locationArray);
    const query = `
       SELECT 
        p.order_id,
        p.nanny_id, 
        p.status, 
        o.created_ts, 
        o.update_ts, 
        o.choosetype, 
        o.orderstatus, 
        o.caretypeid, 
        o.nickname, 
        o.gender, 
        o.birthday, 
        o.rank, 
        o.hope, 
        o.intro, 
        o.isshow, 
        o.created_by,
        n.score,
        k.name,
        c.weekdays,
        c.care_time,
        c.scenario,
        c.start_date,
        c.end_date,
        c.location,
        n.uploadid,
        u.upload_url,
        k.birthday as nannyBirthday,
        COUNT(*) OVER() AS totalCount
        FROM 
            pair p
        LEFT JOIN 
            orderinfo o ON p.order_id = o.id
        LEFT JOIN 
            care_data c ON o.caretypeid = c.id
        LEFT JOIN 
            nanny n ON p.nanny_id = n.id
        LEFT JOIN 
            kyc_info k ON n.kycId = k.id
        LEFT JOIN 
            upload u ON n.uploadid = u.id
        WHERE 
            p.nanny_id = $1
            AND p.status = $6
            AND ($4::text IS NULL OR o.nickname ILIKE '%' || $4::text || '%')
        ORDER BY 
            $5
        OFFSET 
            $2 
        LIMIT 
            $3;
      `;


      const parameterizedQuery = query
      .replace('$1', `'${memberId}'`)
      .replace('$2', offset)
      .replace('$3', limit)
      .replace('$4', keywords ? `'${keywords}'` : 'NULL')
      .replace('$5', orderByClause);

    // Log the constructed query
    console.log('Executing query with parameters:', parameterizedQuery);

    const { rows } = await client.query(query, [memberId, offset, limit, keywords, orderByClause,status]);

    client.release();

    if (rows.length === 0) {
      return res.status(200).json({ success: true, orders: [], pageCount: 0, totalCount: 0 });
    }

    return res.status(200).json({ 
      success: true,
      orders: rows,
      pageCount: rows.length, 
      totalCount: rows[0].totalcount, // 總筆數
    });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, error: 'Database error' });
  }
}
