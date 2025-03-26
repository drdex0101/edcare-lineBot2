// POST /api/pair/create
export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
  
    const { nanny_id, order_id, status } = req.body;
  
    try {
      const result = await db.query(
        `
        INSERT INTO pair (nanny_id, order_id, status, created_time)
        VALUES ($1, $2, $3, NOW())
        RETURNING *;
      `,
        [nanny_id, order_id, status]
      );
  
      res.status(200).json({ success: true, pair: result.rows[0] });
    } catch (error) {
      console.error("Create Pair Error:", error);
      res.status(500).json({ success: false, error: "Create failed" });
    }
  }
  