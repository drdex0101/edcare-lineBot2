import { Client } from 'pg';
import verifyToken from '@/utils/verifyToken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('req.body', req.body);
    const { 
        startDate,
        endDate,
        scenario,
        location,
        careTime,
        idType
    } = req.body;

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
        INSERT INTO suddenly (
          order_id, start_date, end_date, scenario, location, care_time, id_type
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7
        )
        RETURNING *;
      `;
      
      const values = [
        nannyId,
        startDate,
        endDate,
        scenario,
        location,
        careTime,
        idType
      ];
      
      const result = await client.query(query, values);

      console.log('Suddenly created successfully:', result.rows[0]);
      return res.status(201).json({ success: true, suddenly: result.rows[0] });
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