import getClient from '../../../utils/getClient';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.cookies.authToken;
    const accountName = req.cookies.accountName;
    const payload = await verifyToken(token);
    const userId = payload.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'ID parameter is required' });
    }

    const pool = getClient();
    const client = await pool.connect();

    try {
      const query = `
        SELECT member.id, member.kyc_id,nanny.id as nanny_id
        FROM member
        Left join nanny on member.id = nanny.memberid::bigint
        WHERE member.line_id = $1;
      `;

      const result = await client.query(query, [userId]);

      return res.status(200).json({ 
        success: true, 
        member: result.rows, 
        pageCount: result.rowCount,
        accountName: accountName
      });

    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      client.release(); // ✅ 正確用法
    }

  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
