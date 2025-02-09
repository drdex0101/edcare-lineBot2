import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    console.log(id);
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
        k.name,
        l.weekdays,
        l.care_time as long_term_care_time,
        l.scenario as long_term_scenario,
        s.start_date as suddenly_start_date,
        s.end_date as suddenly_end_date,
        s.care_time as suddenly_care_time,
        s.location as suddenly_location,
        s.scenario as suddenly_scenario,
        COALESCE(s.scenario, l.scenario) AS scenario,
        COUNT(*) OVER() AS totalCount
    FROM 
        orderinfo o
    LEFT JOIN 
        suddenly s ON o.choosetype = 'suddenly' AND o.caretypeid = s.id
    LEFT JOIN 
        long_term l ON o.choosetype = 'long_term' AND o.caretypeid = l.id
    LEFT JOIN 
        nanny n ON o.nannyid = n.id
    LEFT JOIN 
        kyc_info k ON n.kycId = k.id
    WHERE 
        o.id = $1
      `;
      
      const result = await client.query(query, [id]);

      return res.status(200).json({ 
        success: true, 
        orders: result.rows, 
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