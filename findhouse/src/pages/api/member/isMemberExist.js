import getClient from '../../../utils/getClient';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.cookies.authToken;
    const accountName = req.cookies.accountName;
    const payload = await verifyToken(token);
    const userId = payload.userId;
    console.log(userId);
      
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
          member.id
        FROM member
        WHERE member.line_id = $1;
      `;
      
      // Convert id to integer if it's a numeric string
      const result = await client.query(query, [userId]);

      console.log('memberInfo retrieved successfully:', result.rows);
      console.log('userId', userId);
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