import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { pageSize = 5, index = 0,locations,keyword,sort } = req.query; // Default values if not provided

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      // Query to get the total count of nannies
      const totalCountQuery = `SELECT COUNT(*) FROM nanny;`;
      const totalCountResult = await client.query(totalCountQuery);
      const totalCount = parseInt(totalCountResult.rows[0].count, 10);

      // Convert locations string to an array
      const locationsArray = locations ? locations.split(',') : [];

      // Determine the order by clause based on the sort parameter
      let orderByClause = '';
      if (sort === 'time') {
        orderByClause = 'ORDER BY n.created_ts DESC';
      } else if (sort === 'rating') {
        orderByClause = 'ORDER BY n.score DESC';
      }

      // Query to get the paginated results
      const query = `
        SELECT 
          n.id, n.memberId, n.experienment, n.age, n.kidCount, n.way, n.scenario, 
          n.environmentPic, n.serviceLocation, n.introduction, n.service, 
          n.score, n.isShow, n.location, n.kycId, n.uploadId, n.created_ts,
          m.account
        FROM nanny n
        JOIN member m ON n.memberId = m.id::VARCHAR  -- Cast m.id to VARCHAR for comparison
        WHERE ($1::text[] IS NULL OR n.serviceLocation = ANY($1))  -- Filter by locations if provided
        AND ($2::text IS NULL OR m.account ILIKE '%' || $2::text || '%')  -- Filter by account if keyword is provided
        ${orderByClause}  -- Add the order by clause if applicable
        LIMIT $3 OFFSET $4;
      `;
      const result = await client.query(query, [locationsArray.length ? locationsArray : null, keyword, pageSize, index * pageSize]);

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