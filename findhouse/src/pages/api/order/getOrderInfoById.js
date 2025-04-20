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
       WITH main_pair AS (
        SELECT *
        FROM pair
        WHERE order_id = $1
        ORDER BY 
          CASE 
            WHEN status = 'onGoing' THEN 1
            WHEN status = 'signing' THEN 2
            WHEN status = 'finish' THEN 3
            WHEN status IN ('matchByParent', 'matchByNanny') THEN 4
            ELSE 5
          END,
          created_time DESC
        LIMIT 1
      ),
      order_status AS (
        SELECT 
          $1::bigint AS order_id, -- 明確補上 order_id 欄位
          CASE
            WHEN EXISTS (SELECT 1 FROM pair WHERE order_id = $1 AND status = 'onGoing') THEN 'onGoing'
            WHEN EXISTS (SELECT 1 FROM pair WHERE order_id = $1 AND status = 'signing') THEN 'signing'
            WHEN EXISTS (SELECT 1 FROM pair WHERE order_id = $1 AND status = 'finish') THEN 'finish'
            WHEN EXISTS (SELECT 1 FROM pair WHERE order_id = $1 AND status IN ('matchByParent', 'matchByNanny')) THEN 'match'
            ELSE 'create'
          END AS pair_status
      )

      SELECT 
        o.id,
        mp.nanny_id,
        mp.status,
        mp.created_time,
        o.created_ts, 
        o.update_ts, 
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
        n.environmentpic,
        c.weekdays,
        c.care_time,
        c.care_type,
        c.scenario,
        c.start_date,
        c.end_date,
        c.start_time,
        c.end_time,
        c.location,
        os.pair_status,
        1 AS totalCount

      FROM 
        orderinfo o
      LEFT JOIN 
        care_data c ON o.caretypeid = c.id
      LEFT JOIN 
        main_pair mp ON o.id = mp.order_id
      LEFT JOIN 
        member m ON mp.nanny_id = m.id
      LEFT JOIN 
        nanny n ON mp.nanny_id = n.id
      LEFT JOIN 
        kyc_info k ON n.kycid::bigint = k.id
      LEFT JOIN 
        order_status os ON os.order_id = o.id
      WHERE 
        o.id = $1;
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