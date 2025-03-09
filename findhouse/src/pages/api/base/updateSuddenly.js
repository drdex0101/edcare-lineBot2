import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    console.log('req.body', req.body);
    const { 
        id,
        startDate,
        endDate,
        scenario,
        location,
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
        UPDATE suddenly
        SET 
          start_date = $2,
          end_date = $3,
          scenario = $4,
          location = $5,
          care_time = $6,
          id_type = $7
        WHERE id = $1
        RETURNING *;
      `;
      
      const values = [
        id,
        startDate,
        endDate,
        scenario,
        location,
        careTime,
        idType
      ];
      
      const result = await client.query(query, values);

      console.log('Suddenly updated successfully:', result.rows[0]);
      return res.status(200).json({ success: true, suddenly: result.rows[0] });
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