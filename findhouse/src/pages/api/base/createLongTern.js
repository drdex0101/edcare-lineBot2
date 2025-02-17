import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('req.body', req.body);
    const { 
        nannyId,          // 用作 memberId
        weekdays,
        scenario,
        careTime,
        idType
    } = req.body;

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      const query = `
        INSERT INTO long_term (
          order_id, weekdays, scenario, care_time, id_type
        )
        VALUES (
          $1, $2, $3, $4, $5
        )
        RETURNING *;
      `;
      
      const values = [
        nannyId,
        weekdays,
        scenario,
        careTime,
        idType
      ];
      
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