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
          nanny.id AS nanny_id, memberId, experienment, age, kidCount, way,
          environmentPic, serviceLocation, introduction, service, score, isShow, nanny.kycId, uploadId, nanny.created_ts,
          k.name, k.birthday, u.upload_url, nanny.location, nanny.address, nanny.area
        FROM nanny
        LEFT JOIN kyc_info k ON nanny.kycid = k.id
        LEFT JOIN upload u ON nanny.uploadid = u.id
        WHERE nanny.id = $1;
      `;

      // Convert id to integer if it's a numeric string
      const nannyId = parseInt(id, 10);
      const result = await client.query(query, [nannyId]);

      console.log('Nannies retrieved successfully:', result.rows);
      return res.status(200).json({
        success: true,
        nannies: result.rows,
        pageCount: result.rowCount // Count of records in the current page
      });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}