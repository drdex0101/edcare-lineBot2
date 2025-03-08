import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    console.log('req.body', req.body);
    const { name, identityCard, gender, birthday, welfareCertNo, address, communicateAddress, identityFrontUploadId, identityBackUploadId, iconUploadId, status } = req.body;

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
        UPDATE kyc_info SET
          name = $1,
          identityCard = $2,
          gender = $3,
          birthday = $4,
          address = $5,
          communicateAddress = $6,
          welfareCertNo = $7,
          identityFrontUploadId = $8,
          identityBackUploadId = $9,
          iconUploadId = $10,
          status = $11
        WHERE id = $12
        RETURNING *;
      `;
      const values = [
        name, 
        identityCard, 
        gender, 
        birthday, 
        address,           // was welfareCertNo
        communicateAddress,// was address
        welfareCertNo,     // was communicateAddress
        identityFrontUploadId,
        identityBackUploadId,
        iconUploadId,
        status
      ];
      const result = await client.query(query, values);

      console.log('kycInfo created successfully:', result.rows[0]);
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
