import getClient from '../../../utils/getClient';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { kycId, memberId } = req.body;

    // 創建 PostgreSQL 客戶端
    const client = getClient();

    try {
      // 連接資料庫
      await client.connect();

      // 使用參數化查詢更新資料
      const query = `
        UPDATE member
        SET kyc_id = $1,
            update_ts = NOW()
        WHERE id = $2
        RETURNING *;
      `;
      const values = [kycId, memberId];

      const result = await client.query(query, values);

      console.log('Member created successfully:', result.rows[0]);
      return res.status(201).json({ success: true, member: result.rows[0] });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } 
  } else {
    // 不支援的 HTTP 方法
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
