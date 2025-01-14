import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('req.body', req.body);
    const { 
      account,          // 用作 memberId
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
      uploadId
    } = req.body;

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();

      const query = `
        INSERT INTO nanny (
          memberId, experienment,
          age, kidCount, way, scenario, environmentPic,
          serviceLocation, introduction, service, score, isShow,
          location, kycId, uploadId, created_ts
        )
        VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15,
          NOW()
        )
        RETURNING *;
      `;
      console.log(query);
      const values = [
        '',        // memberId
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
        uploadId
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