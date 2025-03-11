import getClient from '../../../utils/getClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID parameter is required' 
      });
    }

    const client = getClient();

    try {
      await client.connect();

      const query = `
        SELECT 
          *
        FROM care_data
        WHERE id = $1;
      `;
      
      // Convert id to integer if it's a numeric string
      const caretypeid = parseInt(id, 10);
      const result = await client.query(query, [caretypeid]);

      console.log('care_data retrieved successfully:', result.rows);
      return res.status(200).json({ 
        success: true, 
        data: result.rows[0],
        pageCount: result.rowCount
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