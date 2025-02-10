import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { 
      orderId,
      nannyid,
      status,
      choosetype,
      orderstatus,
      caretypeid,
      nickname,
      gender,
      birthday,
      rank,
      hope,
      intro,
      isshow,
      created_by
     } = req.body;

    // Debugging: Log the data object to check its structure
    console.log('Received data:', req.body);


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
        UPDATE orderinfo
        SET
            nannyid = $2,
            status = $3,
            choosetype = $4,
            orderstatus = $5,
            caretypeid = $6,
            nickname = $7,
            gender = $8,
            birthday = $9,
            rank = $10,
            hope = $11,
            intro = $12,
            isshow = $13,
            created_by = $14
        WHERE id = $1
      `;

      const values = [
          orderId, nannyid, status, choosetype, orderstatus, 
          caretypeid, nickname, gender, birthday, rank, hope, intro, isshow, created_by
      ];




      const result = await client.query(query, values);

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
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}