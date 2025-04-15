import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { 
      id,
      nannyid,
      status,
      choosetype,
      orderstatus,
      caretypeid,
      nickname,
      gender,
      birthday,
      rank,
      hope,
      intro,
      isshow,
      created_by
    } = req.body;

    console.log('Received data:', req.body);

    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'ID parameter is required' });
    }

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();
      await client.query('BEGIN'); // ⛓ 開始交易

      // 先刪除 pair 中與該 order 有關的紀錄
      const deletePairQuery = `DELETE FROM pair WHERE order_id = $1`;
      await client.query(deletePairQuery, [id]);

      // 再更新 orderinfo
      const updateOrderQuery = `
        UPDATE orderinfo
        SET
          nannyid = $2,
          status = $3,
          choosetype = $4,
          orderstatus = $5,
          caretypeid = $6,
          nickname = $7,
          gender = $8,
          birthday = $9,
          rank = $10,
          hope = $11,
          intro = $12,
          isshow = $13,
          created_by = $14
        WHERE id = $1
        RETURNING *
      `;

      const values = [
        id ? parseInt(id) : null,
        nannyid ? parseInt(nannyid) : null,
        status,
        choosetype,
        orderstatus,
        caretypeid ? parseInt(caretypeid) : null,
        nickname,
        gender,
        birthday,
        rank ? parseInt(rank) : null,
        hope,
        intro,
        isshow,
        created_by ? parseInt(created_by) : null
      ];

      const result = await client.query(updateOrderQuery, values);

      await client.query('COMMIT'); // ✅ 提交交易

      return res.status(200).json({ 
        success: true,
        orders: result.rows,
        pageCount: result.rowCount
      });

    } catch (error) {
      await client.query('ROLLBACK'); // ❌ 發生錯誤時回滾
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      await client.end();
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
