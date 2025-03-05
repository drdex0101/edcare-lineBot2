import { Client } from 'pg';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log('req.body', req.query);
    const { type, page, pageSize, keyword } = req.query;

    const currentPage = Math.max(1, parseInt(page));
    const offset = (currentPage - 1) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;

    // 創建 PostgreSQL 客戶端
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false, // 如果你在 Vercel 上運行，通常需要這個設定
      },
    });

    try {
      // 連接資料庫
      await client.connect();

      // 使用參數化查詢插入資料
      const query = `
        SELECT 
        o.id,
        o.nannyId, 
        o.status, 
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
        k.name,
        l.weekdays,
        l.care_time AS long_term_care_time,
        l.scenario AS long_term_scenario,
        s.start_date AS suddenly_start_date,
        s.end_date AS suddenly_end_date,
        s.care_time AS suddenly_care_time,
        s.location AS suddenly_location,
        s.scenario AS suddenly_scenario,
        COALESCE(s.scenario, l.scenario) AS scenario,
        COUNT(*) OVER() AS totalCount
        FROM 
            favorites f
        LEFT JOIN 
            orderinfo o ON f.item_id::bigint = o.id
        LEFT JOIN 
            suddenly s ON o.choosetype = 'suddenly' AND o.caretypeid = s.id
        LEFT JOIN 
            long_term l ON o.choosetype = 'long_term' AND o.caretypeid = l.id
        LEFT JOIN 
            nanny n ON o.nannyid = n.id
        LEFT JOIN 
            kyc_info k ON n.kycId = k.id
        WHERE 
            f.user_id = $1
            AND f.type = $2
        ORDER BY 
            o.created_ts DESC  -- You may want to sort results
      `;

      const values = [
        userId,
        type,
      ];

      // Log the query and values
      console.log('Query:', query);
      console.log('Values:', values);

      const result = await client.query(query, values);

      console.log('favorite list:', result.rows);
      return res.status(201).json({ success: true, favorite: result.rows });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      // 關閉連接
      await client.end();
    }
  } else {
    // 不支援的 HTTP 方法
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
