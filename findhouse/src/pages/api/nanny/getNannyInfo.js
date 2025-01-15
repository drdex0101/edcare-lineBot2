import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query; // Default values if not provided

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      // Query to get the paginated results
      const query = `
        SELECT 
          id,memberId, experienment, age, kidCount, way, scenario, 
          environmentPic, serviceLocation, introduction, service, 
          score, isShow, location, kycId, uploadId, created_ts
        FROM nanny
        where id = $1;
      `;
      const result = await client.query(query, [pageSize, index * pageSize]);

      console.log('Nannies retrieved successfully:', result.rows);
      return res.status(200).json({ 
        success: true, 
        nannies: result.rows, 
        totalCount: totalCount, // Total count of all records
        pageCount: result.rowCount // Count of records in the current page
      });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      await client.end();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}