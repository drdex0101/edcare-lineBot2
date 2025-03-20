import getClient from '../../../utils/getClient';
import { verifyToken } from '../../../utils/jwtUtils';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('req.body', req.body);
    const { 
      memberId,
      experienment,
      age,
      kidCount,
      way,
      scenario,
      environmentPic,
      serviceLocation,
      introduction,
      service,
      score,
      isShow,
      location,
      kycId,
      uploadId,
      careTypeId
    } = req.body;

    const client = getClient();
    const token = req.cookies.authToken;
    const payload = await verifyToken(token);
    const userId = payload.userId;

    try {
      await client.connect();

      const query = `
        INSERT INTO nanny (
          memberId, experienment,
          age, kidCount, way, scenario, environmentPic,
          serviceLocation, introduction, service, score, isShow,
          location, kycid, uploadId, care_type_id, created_ts
        )
        VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16,
          NOW()
        )
        RETURNING *;
      `;
      console.log(query);
      const values = [
        memberId,       // memberId
        experienment,
        age,
        kidCount,
        way,
        scenario,
        environmentPic,
        serviceLocation,
        introduction,
        service,
        score,
        isShow,
        location,
        kycId,
        uploadId,
        careTypeId
      ];
      const result = await client.query(query, values);

      console.log('Nanny created successfully:', result.rows[0]);
      return res.status(201).json({ success: true, nanny: result.rows[0] });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    } finally {
      await client.end();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}