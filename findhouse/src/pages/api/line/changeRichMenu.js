import axios from 'axios';
import { verifyToken } from '../../../utils/jwtUtils';
import cookie from 'js-cookie';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const { richMenuId } = req.body;
    const token = cookie.get('authToken');
    const payload = await verifyToken(token);
    if (!payload || payload.userId !== userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const userId = payload.userId;

    try {
      // 綁定 Rich Menu 到用戶
      const response = await fetch(`https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN}`,  // 確保 Token 正確
          'Content-Type': 'application/json'
        }
      });
      
      res.status(200).json({ message: 'Rich Menu changed successfully!' });
    } catch (error) {
      console.error('Error changing Rich Menu:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to change Rich Menu' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
