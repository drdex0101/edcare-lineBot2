import getClient from '../../../utils/getClient';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.cookies.authToken;
    const accountName = req.cookies.accountName;
    const payload = await verifyToken(token);
    const userId = payload.userId;
      
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID parameter is required' 
      });
    }

    const client = getClient();

    try {
      await client.connect();

      const query = `
        SELECT 
          member.account, 
          member.cellphone, 
          member.email, 
          member.job, 
          member.created_ts,
          kyc_info.name
        FROM member
        JOIN kyc_info ON member.kyc_id::bigint = kyc_info.id::bigint
        WHERE member.line_id = $1;
      `;
      
      // Convert id to integer if it's a numeric string
      const result = await client.query(query, [userId]);

      console.log('memberInfo retrieved successfully:', result.rows);
      return res.status(200).json({ 
        success: true, 
        member: result.rows, 
        pageCount: result.rowCount,
        accountName: accountName
      });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } 
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}