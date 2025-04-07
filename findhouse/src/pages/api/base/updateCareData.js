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
        startTime,
        endTime,
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
          start_time = $4,
          end_time = $5,
          id_type = $6,
          scenario = $7,
          start_date = $8,
          end_date = $9,
          location = $10,
          care_type = $11
        WHERE id = $1
        RETURNING *;
      `;
      const weekdaysArray = weekdays.map((day) => day.toString());
      const values = [careDataId, weekdaysArray, careTime, startTime, endTime, idType, scenario, startDate, endDate, location, careType];

      const result = await client.query(query, values);

      console.log("Suddenly updated successfully:", result.rows[0]);
      return res.status(200).json({ success: true, careData: result.rows[0] });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Database error" });
    } 
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
