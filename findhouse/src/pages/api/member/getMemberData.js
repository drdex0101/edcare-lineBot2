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
    const client = await pool.connect();  // 改這裡！

    try {
      const query = `
        SELECT 
          member.id,
          member.account,
          member.cellphone, 
          member.email, 
          member.job, 
          member.created_ts
        FROM member
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
      client.release();  // 一定要 release client
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
