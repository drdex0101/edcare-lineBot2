import getClient from "../../../utils/getClient";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const {
      pageSize = 5,
      index = 0,
      locations,
      keyword,
      sort,
      orderId,
    } = req.query; // Default values if not provided

    // Ensure index is non-negative
    const safeIndex = Math.max(0, parseInt(req.query.page, 10) || 0);

    const client = getClient();

    try {
      await client.connect();

      // Query to get the total count of nannies
      const totalCountQuery = `SELECT COUNT(*) FROM nanny;`;
      const totalCountResult = await client.query(totalCountQuery);

      // Convert locations string to an array
      const locationsArray = locations ? locations.split(",") : [];

      let excludeNannySql = "";
      let queryParams = [
        locationsArray.length ? locationsArray : null,
        keyword,
        pageSize,
        safeIndex * pageSize,
      ];
      if (orderId && orderId !== "null") {
        excludeNannySql = `
          AND n.id NOT IN (
            SELECT p.nanny_id FROM pair p WHERE p.order_id = $5 AND p.status = 'onGoing'
          )`;
        queryParams.push(orderId);
      }

      // Determine the order by clause based on the sort parameter
      let orderByClause = "";
      if (sort === "time") {
        orderByClause = "ORDER BY n.created_ts DESC";
      } else if (sort === "rating") {
        orderByClause = "ORDER BY n.score DESC";
      }

      // Query to get the paginated results
      const query = `
  SELECT 
    n.id, n.memberId, n.experienment, n.age, n.kidCount, n.way, 
    n.environmentPic, n.serviceLocation, n.introduction, n.service, 
    n.score, n.isShow, n.location, n.kycId, n.uploadId, n.created_ts,
    m.account, u.upload_url,
    k.name as kyc_name
  FROM nanny n
  LEFT JOIN member m ON n.memberId = m.id::VARCHAR
  LEFT JOIN upload u ON n.uploadId = u.id
  LEFT JOIN kyc_info k ON n.kycid = k.id
  WHERE 
    ($1::varchar[] IS NULL OR n.serviceLocation && $1::varchar[])
    AND ($2::text IS NULL OR k.name ILIKE '%' || $2::text || '%')
    AND n.isshow = TRUE
    ${excludeNannySql}
  ${orderByClause}
  LIMIT $3 OFFSET $4;
`;

      const result = await client.query(query, queryParams); // <-- 改這一行

      console.log("Nannies retrieved successfully:", result.rows);
      return res.status(200).json({
        success: true,
        nannies: result.rows,
        totalCount: totalCountResult.rows[0].count, // Total count of records in the current result
        pageCount: result.rowCount, // Count of records in the current page
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Database error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
