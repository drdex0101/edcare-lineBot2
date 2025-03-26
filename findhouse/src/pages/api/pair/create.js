import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';
import getClient from '../../../utils/getClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id,orderId, status } = req.body; // orderId 為訂單ID

    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;
    var nannyId = 0;
    
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      if (id==0) {

        // 先搜尋專屬的 nannyId
        const memberQuery = `SELECT id FROM member WHERE line_id = $1`;
        const memberResult = await client.query(memberQuery, [userId]);
  
        if (memberResult.rows.length === 0) {
          return res.status(404).json({ error: 'Member not found' });
        }
  
        const memberId = memberResult.rows[0].id;
        const nannyQuery = `SELECT id FROM nanny WHERE memberid = $1`;
        const nannyResult = await client.query(nannyQuery, [memberId]);
  
        if (nannyResult.rows.length === 0) {
          return res.status(404).json({ error: 'Nanny not found' });
        }

        console.log(nannyResult.rows[0].id)
  
        nannyId = nannyResult.rows[0].id;
      }
  

      const insertPairQuery = `
        INSERT INTO pair (nanny_id, order_id, status)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;

      var pairResult=""
      if (id===0) {
        pairResult = await client.query(insertPairQuery, [nannyId, orderId, status]);
      }
      else {
         pairResult = await client.query(insertPairQuery, [id, orderId, status]);
      }

      res.status(201).json({ success: true, pair: pairResult.rows[0] });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      await client.end();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}