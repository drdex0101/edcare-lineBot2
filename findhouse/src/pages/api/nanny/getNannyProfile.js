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
      console.log(memberIdResult);
      
      if (memberIdResult.rowCount === 0) {
        return res.status(200).json({ 
          success: true, 
          nannyProfile: [], 
          pageCount: 0
        });
      }

      const memberId = memberIdResult.rows[0].id;
      console.log('memberId:',memberId);

      const query = `
        SELECT 
          nanny.id AS nanny_id, 
          nanny.memberId, 
          nanny.experienment, 
          nanny.age, 
          nanny.kidCount, 
          nanny.way, 
          nanny.environmentPic, 
          nanny.serviceLocation, 
          nanny.introduction, 
          nanny.service, 
          nanny.score, 
          nanny.isShow, 
          nanny.location, 
          nanny.kycId, 
          nanny.uploadId, 
          nanny.created_ts,
          k.name,
          c.weekdays,
          c.care_time,
          c.start_date ,
          c.end_date,
          c.care_time,
          c.location,
          c.scenario,
          c.care_type
        FROM nanny
        LEFT JOIN kyc_info k ON nanny.kycId = k.id
        LEFT JOIN care_data c ON nanny.care_type_id = c.id
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