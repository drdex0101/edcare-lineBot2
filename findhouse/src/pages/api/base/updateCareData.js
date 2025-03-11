import { Client } from "pg";
import { verifyToken } from "../../../utils/jwtUtils";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    console.log("req.body", req.body);
    const { 
        weekdays,
        careType,
        idType,
        startDate,
        endDate,
        scenario,
        location,
        careTime,
        careDataId
    } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const nannyId = payload.userId;

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      const query = `
        UPDATE care_data
        SET 
          weekdays = $2,
          care_time = $3,
          id_type = $4,
          scenario = $5,
          start_date = $6,
          end_date = $7,
          location = $8,
          care_type = $9
        WHERE id = $1
        RETURNING *;
      `;
      const weekdaysArray = weekdays.map((day) => day.toString());
      const values = [careDataId, weekdaysArray, careTime, idType, scenario, startDate, endDate, location, careType];

      const result = await client.query(query, values);

      console.log("Suddenly updated successfully:", result.rows[0]);
      return res.status(200).json({ success: true, long_term: result.rows[0] });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Database error" });
    } finally {
      await client.end();
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
