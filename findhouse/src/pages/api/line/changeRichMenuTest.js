import getClient from '../../../utils/getClient';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const { richMenuId, kycId } = req.body;

    const pool = getClient();
    const client = await pool.connect();

    try {
      // 從資料庫中取得line_id
      const query = 'SELECT line_id FROM member WHERE kyc_id = $1';
      const result = await client.query(query, [kycId]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const lineId = result.rows[0].line_id;

      // 綁定 Rich Menu 到用戶
      const response = await fetch(`https://api.line.me/v2/bot/user/${lineId}/richmenu/${richMenuId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'LINE API error');
      }
      console.log('lineId:',lineId);

      res.status(200).json({ message: 'Rich Menu changed successfully!' });
    } catch (error) {
      console.error('Error changing Rich Menu:', error.message);
      res.status(500).json({ error: 'Failed to change Rich Menu' });
    } finally {
      client.release();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}