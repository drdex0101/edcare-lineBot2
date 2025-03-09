import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Raw request body:', req.body);
    console.log('Request body type:', typeof req.body);
    
    const { 
        longTermDays,
        longTermCareType,
        idType
    } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const nannyId = payload.userId;

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      if (!Array.isArray(longTermDays) || longTermDays.length === 0) {
        return res.status(400).json({ 
          error: 'Invalid input', 
          message: 'weekdays must be a non-empty array',
          received: longTermDays 
        });
      }

      const query = `
        INSERT INTO long_term (
          order_id, weekdays, care_time, id_type
        )
        VALUES (
          $1, $2, $3, $4
        )
        RETURNING *;
      `;
      
      const weekdaysArray = longTermDays.map(day => day.toString());
      const values = [
        nannyId,
        weekdaysArray,
        longTermCareType,
        idType
      ];
      
      console.log('Final query values:', values);
      const result = await client.query(query, values);

      console.log('Suddenly created successfully:', result.rows[0]);
      return res.status(201).json({ success: true, long_term: result.rows[0] });
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