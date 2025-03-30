import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { 
      id,
      orderId,
      status,
      preStatus
     } = req.body;

    // Debugging: Log the data object to check its structure
    console.log('Received data:', req.body);


    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;
    
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID parameter is required' 
      });
    }

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      const query = `
        UPDATE pair
        SET status = $2,
        created_time = now()
        WHERE nanny_id = $1 and order_id = $3 and status = $4
        RETURNING *;
      `;

      const values = [
          id ? parseInt(id) : null,
          status,
          orderId,
          preStatus
        ];


      const result = await client.query(query, values);

      return res.status(200).json({ 
        success: true, 
        orders: result.rows, 
        pageCount: result.rowCount // Count of records in the current page
      });
    } catch (error) {
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