import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'GET') {


    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      // Query to get the total count of nannies
      const totalCountQuery = `SELECT COUNT(*) FROM kyc_info;`;
      const totalCountResult = await client.query(totalCountQuery);
      const totalCount = parseInt(totalCountResult.rows[0].count, 10);

      // Query to get the paginated results
      const query = `
       SELECT k.*, m.job, m.line_id
        FROM kyc_info k
        JOIN member m ON m.kyc_id = CAST(k.id AS VARCHAR) where m.line_id=$1;
      `;
      const result = await client.query(query, [userId]);

      console.log('Nannies retrieved successfully:', result.rows);
      return res.status(200).json({ 
        success: true, 
        kycInfoList: result.rows, 
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