import { Pool } from 'pg';
import { verifyToken } from '../../utils/jwtUtils';
import cookie from 'js-cookie';
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
  const token = cookie.get('authToken');
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
        o.nannyId,
        n.id AS nannyId, 
        n.kycId,
        k.name AS kycName,
        n.memberId, 
        n.experienment, 
        n.age, 
        n.score,
        COUNT(*) OVER() AS totalCount
      FROM orderinfo o
      JOIN nanny n ON o.nannyId = n.id
      JOIN kyc_info k ON n.kycId = k.id
      WHERE o.nannyId IS NOT NULL
      ORDER BY o.created_ts DESC
      OFFSET $1 LIMIT $2;
    `;

    const { rows } = await client.query(query, [offset, limit]);

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
