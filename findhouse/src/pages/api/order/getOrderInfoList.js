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

  const { page = 1, pageSize = 10, keywords, sort, locations } = req.query;
  const token = req.cookies.authToken;
  const payload = await verifyToken(token);
  const userId = payload.userId;
  
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
        o.id,
        o.nannyId, 
        o.status, 
        o.created_ts, 
        o.update_ts,  
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
        c.care_type,
        COUNT(*) OVER() AS totalCount
        FROM 
            orderinfo o
        LEFT JOIN 
            care_data c ON o.caretypeid = c.id
        LEFT JOIN 
            nanny n ON o.nannyid = n.id
        LEFT JOIN 
            kyc_info k ON n.kycid = k.id
        LEFT JOIN 
            pair p ON p.order_id = o.id
        WHERE 
            o.parentLineId = $1
            AND ($4::text IS NULL OR o.nickname ILIKE '%' || $4::text || '%')
            AND (p.status IS NULL OR p.status != 'onGoing')  -- 修改這裡
        ORDER BY 
            $5
        OFFSET 
            $2 
        LIMIT 
            $3;
      `;


      const parameterizedQuery = query
      .replace('$1', `'${userId}'`)
      .replace('$2', offset)
      .replace('$3', limit)
      .replace('$4', keywords ? `'${keywords}'` : 'NULL')
      .replace('$5', orderByClause);

    // Log the constructed query
    console.log('Executing query with parameters:', parameterizedQuery);

    const { rows } = await client.query(query, [userId, offset, limit, keywords, orderByClause]);

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
