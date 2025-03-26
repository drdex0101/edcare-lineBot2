// GET /api/pair/list?nanny_id=xxx 或 /api/pair/list?order_id=xxx
export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();
  
    const { nanny_id, order_id } = req.query;
  
    try {
      let query = `SELECT * FROM pair WHERE 1=1`;
      const params = [];
  
      if (nanny_id) {
        params.push(nanny_id);
        query += ` AND nanny_id = $${params.length}`;
      }
  
      if (order_id) {
        params.push(order_id);
        query += ` AND order_id = $${params.length}`;
      }
  
      query += ` ORDER BY created_time DESC`;
  
      const result = await db.query(query, params);
  
      res.status(200).json({ success: true, pairs: result.rows });
    } catch (error) {
      console.error("Get Pair List Error:", error);
      res.status(500).json({ success: false, error: "Fetch failed" });
    }
  }
  