import getClient from '../../../utils/getClient';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { pageSize = 5, index = 0,locations,keyword,sort } = req.query; // Default values if not provided

    // Ensure index is non-negative
    const safeIndex = Math.max(0, parseInt(req.query.page, 10) || 0);


    const client = getClient();

    try {
      await client.connect();

      // Query to get the total count of nannies
      const totalCountQuery = `SELECT COUNT(*) FROM nanny;`;
      const totalCountResult = await client.query(totalCountQuery);

      // Convert locations string to an array
      const locationsArray = locations ? locations.split(',') : [];

      // Determine the order by clause based on the sort parameter
      let orderByClause = '';
      if (sort === 'time') {
        orderByClause = 'ORDER BY n.created_ts DESC';
      } else if (sort === 'rating') {
        orderByClause = 'ORDER BY n.score DESC';
      }

      // Query to get the paginated results
      const query = `
        SELECT 
          n.id, n.memberId, n.experienment, n.age, n.kidCount, n.way, n.scenario, 
          n.environmentPic, n.serviceLocation, n.introduction, n.service, 
          n.score, n.isShow, n.location, n.kycId, n.uploadId, n.created_ts,
          m.account, u.upload_url,
          c.weekdays,
          c.care_time,
          c.scenario,
          c.start_date,
          c.end_date,
          c.location
        FROM nanny n
        LEFT JOIN member m ON n.memberId = m.id::VARCHAR  -- Cast m.id to VARCHAR for comparison
        LEFT JOIN upload u ON n.uploadId = u.id
        LEFT JOIN care_data c ON n.care_type_id = c.id
        WHERE ($1::varchar[] IS NULL OR n.serviceLocation && $1::varchar[])
        AND ($2::text IS NULL OR m.account ILIKE '%' || $2::text || '%')  -- Filter by account if keyword is provided
        AND n.isshow = TRUE
        ${orderByClause}  -- Add the order by cause if applicable
        LIMIT $3 OFFSET $4;
      `;
      const result = await client.query(query, [locationsArray.length ? locationsArray : null, keyword, pageSize, safeIndex * pageSize]);

      console.log('Nannies retrieved successfully:', result.rows);
      return res.status(200).json({ 
        success: true, 
        nannies: result.rows, 
        totalCount: totalCountResult.rows[0].count, // Total count of records in the current result
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