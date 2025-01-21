import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    
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
          parentLineId, nannyid, status, created_ts, update_ts, choosetype, orderstatus, 
        caretypeid, nickname, gender, birthday, rank, hope, intro, isshow, created_by
        FROM orderinfo
        WHERE parentLineId = $1;
      `;
      
      const result = await client.query(query, [userId]);

      console.log('Nannies retrieved successfully:', result.rows);
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