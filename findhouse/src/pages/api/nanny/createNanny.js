import getClient from '../../../utils/getClient';
import { verifyToken } from '../../../utils/jwtUtils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('req.body', req.body);

    const {
      memberId,
      area,
      experienment,
      age,
      kidCount,
      way,
      environmentPic,
      serviceLocation,
      introduction,
      service,
      score,
      isShow,
      location,
      address,
      kycId,
      uploadId,
      careTypeId,
    } = req.body;

    const client = getClient();
    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;

    const safeArray = (v) => {
      if (!v) return null;
      if (Array.isArray(v)) {
        return `{${v.map((item) => `"${item}"`).join(',')}}`;
      }
      return v;
    };
    

    try {
      await client.connect();

      // ⭐ 重點：如果是 Array 或 Object 自動轉成 JSON 字串
      const safeValue = (v) =>
        v && (Array.isArray(v) || typeof v === 'object') ? JSON.stringify(v) : v;

      const query = `
        INSERT INTO nanny (
          memberid,
          area,
          experienment,
          age,
          kidcount,
          way,
          environmentpic,
          servicelocation,
          introduction,
          service,
          score,
          isshow,
          location,
          address,
          kycid,
          uploadid,
          care_type_id,
          created_ts
        )
        VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15,
          $16, $17,NOW()
        )
        RETURNING *;
      `;

      const values = [
        memberId,
        area,
        experienment,
        age,
        kidCount,
        safeArray(way),
        safeArray(environmentPic),
        safeArray(serviceLocation),
        introduction,
        safeArray(service),
        score,
        isShow,
        safeArray(location),
        address,
        kycId,
        uploadId,
        careTypeId
      ];

      console.log('Executing query:', query);

      const result = await client.query(query, values);

      console.log('Nanny created successfully:', result.rows[0]);
      return res.status(201).json({ success: true, nanny: result.rows[0] });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } 
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
