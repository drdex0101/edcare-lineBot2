import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
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
      uploadId,
      nannyId
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
        UPDATE  nanny 
        SET
          memberId = $1,
          experienment = $2,
          age = $3,
          kidCount = $4,
          way = $5,
          scenario = $6,
          environmentPic = $7,
          serviceLocation = $8,
          introduction = $9,
          service = $10,
          score = $11,
          isShow = $12,
          location = $13,
          kycId = $14,
          uploadId = $15,
          created_ts = NOW()
        WHERE id = $16
        RETURNING *;
      `;
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
        uploadId,
        nannyId
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
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}