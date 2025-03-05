import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log('req.body', req.query);
    const { type, page, pageSize, keyword } = req.query;

    const currentPage = Math.max(1, parseInt(page));
    const offset = (currentPage - 1) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;

    // 創建 PostgreSQL 客戶端
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false, // 如果你在 Vercel 上運行，通常需要這個設定
      },
    });

    try {
      // 連接資料庫
      await client.connect();

      // 使用參數化查詢插入資料
      const query = `
        SELECT 
          n.id, n.memberId, n.experienment, n.age, n.kidCount, n.way, n.scenario, 
          n.environmentPic, n.serviceLocation, n.introduction, n.service, 
          n.score, n.isShow, n.location, n.kycId, n.uploadId, n.created_ts,
          m.account,
        COUNT(*) OVER() AS totalCount
        FROM 
            favorites f
        LEFT JOIN 
            nanny n ON f.item_id::bigint = n.id
        LEFT JOIN 
            member m ON n.memberId = m.id::VARCHAR
        WHERE 
            f.user_id = $1
            AND f.type = $2
        ORDER BY 
            n.created_ts DESC  -- You may want to sort results
      `;

      const values = [
        userId,
        type,
      ];

      // Log the query and values
      console.log('Query:', query);
      console.log('Values:', values);

      const result = await client.query(query, values);

      console.log('favorite list:', result.rows);
      return res.status(201).json({ success: true, favorite: result.rows });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      // 關閉連接
      await client.end();
    }
  } else {
    // 不支援的 HTTP 方法
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
