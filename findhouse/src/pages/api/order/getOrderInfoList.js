import { Pool } from 'pg';

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

  const { userId, page = 1, pageSize = 10 } = req.query;
  
  if (!userId) {
    return res.status(400).json({ success: false, message: 'ID parameter is required' });
  }

  const offset = (parseInt(page) - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);

  try {
    const client = await pool.connect();

    const query = `
      SELECT 
        parentLineId, nannyId, status, created_ts, update_ts, choosetype, orderstatus, 
        caretypeid, nickname, gender, birthday, rank, hope, intro, isshow, created_by,
        COUNT(*) OVER() AS totalCount
      FROM orderinfo
      WHERE parentLineId = $1
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
