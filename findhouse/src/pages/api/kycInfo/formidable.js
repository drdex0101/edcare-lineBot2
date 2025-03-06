import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

export default parseForm;
