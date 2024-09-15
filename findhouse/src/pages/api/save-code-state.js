import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { code, state } = req.body;

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

      // 插入資料
      const query = `
        INSERT INTO code_state (code, state, createTs)
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        RETURNING *;
      `;
      const values = [code, state];

      const result = await client.query(query, values);

      // 成功返回插入的資料
      res.status(200).json({ success: true, data: result.rows[0] });
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
