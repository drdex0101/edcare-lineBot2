import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('req.body', req.body);
    const { account, phoneNumber, email, job, parentid, nannyid, status, choosetype, orderstatus, caretypeid, nickname, gender, birthday, rank, hope, intro, isshow } = req.body;

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
        INSERT INTO member (account, cellphone, email, job, parentid, nannyid, status, created_ts, update_ts, choosetype, orderstatus, caretypeid, nickname, gender, birthday, rank, hope, intro, isshow)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING *;
      `;
      console.log(query);
      const values = [account, phoneNumber, email, job, parentid, nannyid, status, choosetype, orderstatus, caretypeid, nickname, gender, birthday, rank, hope, intro, isshow];
      const result = await client.query(query, values);

      console.log('Member created successfully:', result.rows[0]);
      return res.status(201).json({ success: true, member: result.rows[0] });
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
