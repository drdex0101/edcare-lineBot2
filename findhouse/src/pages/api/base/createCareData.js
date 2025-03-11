import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Raw request body:', req.body);
    console.log('Request body type:', typeof req.body);
    
    const { 
        weekdays,
        careType,
        idType,
        startDate,
        endDate,
        scenario,
        location,
        careTime
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

      const query = `
        INSERT INTO care_data (
          order_id, weekdays, care_time, care_type, id_type, scenario, start_date, end_date, location
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        )
        RETURNING *;
      `;
      
      const weekdaysArray = weekdays.map(day => day.toString());
      const values = [
        nannyId,
        weekdaysArray,
        careTime,
        careType,
        idType,
        scenario,
        startDate,
        endDate,
        location
      ];
      
      console.log('Final query values:', values);
      const result = await client.query(query, values);

      console.log('Suddenly created successfully:', result.rows[0]);
      return res.status(201).json({ success: true, careData: result.rows[0] });
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