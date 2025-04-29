import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    console.log('req.body', req.body);
    const { 
      memberId,
      area,
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
      nannyId,
      experience,
    } = req.body;

    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    const safeArray = (v) => {
      if (!v) return null;
      if (Array.isArray(v)) {
        return `{${v.map((item) => `"${item}"`).join(',')}}`;
      }
      return v;
    };

    try {
      await client.connect();

      const query = `
        UPDATE  nanny 
        SET
          memberId = $1,
          area = $2,
          way = $3,
          environmentPic = $4,
          serviceLocation = $5,
          introduction = $6,
          service = $7,
          score = $8,
          isShow = $9,
          location = $10,
          address = $11,
          kycId = $12,
          uploadId = $13,
          experienment = $15,
          created_ts = NOW()
        WHERE id = $14
        RETURNING *;
      `;
      const values = [
        memberId,        // memberId
        area,
        safeArray(way),
        safeArray(environmentPic),
        safeArray(serviceLocation),
        introduction,
        service,
        score,
        isShow,
        safeArray(location),
        address,
        kycId,
        uploadId,
        nannyId,
        experience,
      ];
      const result = await client.query(query, values);
      console.log('values', values);
      console.log('Nanny updated successfully:', result.rows[0]);
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