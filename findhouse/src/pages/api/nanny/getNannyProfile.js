import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;
    console.log('userId:',userId);
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

      // Query to get memberId using userId
      const memberIdQuery = `
        SELECT id FROM member WHERE line_id = $1;
      `;
      const memberIdResult = await client.query(memberIdQuery, [userId]);
      
      if (memberIdResult.rowCount === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Member not found for the given userId' 
        });
      }

      const memberId = memberIdResult.rows[0].id;

      const query = `
        SELECT 
          nanny.id AS nanny_id, memberId, experienment, age, kidCount, way, scenario, 
          environmentPic, serviceLocation, introduction, service, 
          score, isShow, location, nanny.kycId, uploadId, nanny.created_ts,
          k.name
        FROM nanny
        LEFT JOIN kyc_info k ON nanny.kycId = k.id
        WHERE nanny.memberId = $1;
      `;
      
      const result = await client.query(query, [memberId]);

      console.log('Nannies retrieved successfully:', result.rows);
      return res.status(200).json({ 
        success: true, 
        nannyProfile: result.rows, 
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