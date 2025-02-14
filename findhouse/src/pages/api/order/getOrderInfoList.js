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

  const { page = 1, pageSize = 10 } = req.query;
  const token = req.cookies.authToken;
  const payload = await verifyToken(token);
  const userId = payload.userId;
  
  if (!userId) {
    return res.status(400).json({ success: false, message: 'ID parameter is required' });
  }

  const offset = (parseInt(page) - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);

  try {
    const client = await pool.connect();

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
        k.name,
        l.weekdays,
        l.care_time as long_term_care_time,
        l.scenario as long_term_scenario,
        s.start_date as suddenly_start_date,
        s.end_date as suddenly_end_date,
        s.care_time as suddenly_care_time,
        s.location as suddenly_location,
        s.scenario as suddenly_scenario,
        COALESCE(s.scenario, l.scenario) AS scenario,
        COUNT(*) OVER() AS totalCount
    FROM 
        orderinfo o
    LEFT JOIN 
        suddenly s ON o.choosetype = 'suddenly' AND o.caretypeid = s.id
    LEFT JOIN 
        long_term l ON o.choosetype = 'long_term' AND o.caretypeid = l.id
    LEFT JOIN 
        nanny n ON o.nannyid = n.id
    LEFT JOIN 
        kyc_info k ON n.kycId = k.id
    WHERE 
        o.parentLineId = $1
    ORDER BY created_ts DESC
      OFFSET $2 LIMIT $3;
      `;

    const { rows } = await client.query(query, [userId, offset, limit]);

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
