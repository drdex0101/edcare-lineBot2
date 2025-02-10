import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;
    
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

      const query = `
       SELECT 
        o.id,
        o.parentLineId, 
        o.nannyId, 
        o.status, 
        o.created_ts, 
        o.update_ts, 
        o.choosetype, 
        o.orderstatus, 
        o.caretypeid, 
        o.nickname, 
        o.gender, 
        o.birthday, 
        o.rank, 
        o.hope, 
        o.intro, 
        o.isshow, 
        o.created_by,
        COALESCE(s.scenario, l.scenario) AS scenario,
        COUNT(*) OVER() AS totalCount
    FROM 
        orderinfo o
    LEFT JOIN 
        suddenly s ON o.choosetype = 'suddenly' AND o.caretypeid = s.id
    LEFT JOIN 
        long_term l ON o.choosetype = 'long_term' AND o.caretypeid = l.id
    WHERE 
        o.parentLineId = $1
    ORDER BY 
        o.created_ts DESC
      `;
      
      const result = await client.query(query, [userId]);

      console.log('Nannies retrieved successfully:', result.rows);
      return res.status(200).json({ 
        success: true, 
        nannies: result.rows, 
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