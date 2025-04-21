import { Pool } from "pg";
import { verifyToken } from "../../../utils/jwtUtils";

// 連線池設定
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  const { page = 1, pageSize = 10, keyword = null, sort = null } = req.query;
  const token = req.cookies.authToken;
  const payload = await verifyToken(token);
  const userId = payload.userId;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "ID parameter is required" });
  }

  const offset = (parseInt(page) - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);

  let orderByClause = "";
  if (sort === "time") {
    orderByClause = "o.created_ts DESC";
  } else if (sort === "rating") {
    orderByClause = "o.rank DESC";
  }

  try {
    const client = await pool.connect();

    const query = `
       SELECT 
    o.id,
    o.parentLineId, 
    o.nannyId, 
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
    n.score,
    c.scenario,
    
    -- 根據 pair 狀態計算綜合狀態
    CASE
        WHEN EXISTS (SELECT 1 FROM pair p WHERE p.order_id = o.id AND p.status = 'onGoing') THEN 'onGoing'
        WHEN EXISTS (SELECT 1 FROM pair p WHERE p.order_id = o.id AND p.status = 'signing') THEN 'signing'
        WHEN EXISTS (SELECT 1 FROM pair p WHERE p.order_id = o.id AND p.status = 'finish') THEN 'finish'
        WHEN EXISTS (SELECT 1 FROM pair p WHERE p.order_id = o.id AND p.status IN ('matchByParent', 'matchByNanny')) THEN 'match'
        ELSE 'create'
    END AS status,

    COUNT(*) OVER() AS totalCount

    FROM 
        orderinfo o
    LEFT JOIN 
        care_data c ON o.caretypeid = c.id
    LEFT JOIN 
        nanny n ON o.nannyid = n.id
    WHERE 
        o.parentLineId = $1 
        AND ($4::text IS NULL OR o.nickname ILIKE '%' || $4::text || '%')
    ORDER BY 
        $5
    OFFSET 
        $2 
    LIMIT 
        $3;
    `;

    const { rows } = await client.query(query, [
      userId,
      offset,
      limit,
      keyword,
      orderByClause,
    ]);

    client.release();

    if (rows.length === 0) {
      return res
        .status(200)
        .json({ success: true, orders: [], pageCount: 0, totalCount: 0 });
    }

    return res.status(200).json({
      success: true,
      orders: rows,
      pageCount: rows.length,
      totalCount: rows[0].totalcount, // 總筆數
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ success: false, error: "Database error" });
  }
}
