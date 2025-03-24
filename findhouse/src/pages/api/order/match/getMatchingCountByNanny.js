import { Pool } from 'pg';
import { verifyToken } from '../../../../utils/jwtUtils';

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

  const { page = 1, pageSize = 10, keywords, sort, locations,nannyId,status } = req.query;
  const token = req.cookies.authToken;
  const payload = await verifyToken(token);
  const userId = payload.userId;

  console.log('locations:',locations);
  
  if (!userId) {
    return res.status(400).json({ success: false, message: 'ID parameter is required' });
  }

  // Ensure page is at least 1
  const currentPage = Math.max(1, parseInt(page));
  const offset = (currentPage - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);

  try {
    const client = await pool.connect();

    const memberQuery = `
      SELECT * FROM member
      WHERE line_id = $1
    `;
    const memberValues = [userId];
    const memberResult = await client.query(memberQuery, memberValues);
    console.log('memberResult', memberResult.rows);

    const nannyQuery = `
      SELECT * FROM nanny
      WHERE memberid = $1
    `;
    const nannyValues = [memberResult.rows[0].id];
    const nannyResult = await client.query(nannyQuery, nannyValues);
    console.log('nannyResult', nannyResult.rows[0].id);

    const locationArray = locations ? locations.split(",") : null;
    console.log('locationArray:',locationArray);
    const query = `
       SELECT 
        o.id,
        o.nannyId, 
        o.status, 
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
        k.birthday as nannyBirthday,
        COUNT(*) OVER() AS totalCount
        FROM 
            orderinfo o
        LEFT JOIN 
            care_data c ON o.caretypeid = c.id
        LEFT JOIN 
            nanny n ON o.nannyid = n.id
        LEFT JOIN 
            kyc_info k ON n.kycId = k.id
        WHERE 
            o.nannyId = $1
            AND o.status = $4
        ORDER BY 
            o.created_ts DESC
        OFFSET 
            $2 
        LIMIT 
            $3;
      `;

    const { rows } = await client.query(query, [nannyResult.rows[0].id, offset, limit,status]);

    return res.status(200).json({ 
      success: true,
      orders: rows,
      pageCount: rows.length, 
      totalCount: rows.length > 0 ? rows[0].totalcount : 0,
    });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ success: false, error: 'Database error' });
  }
}
