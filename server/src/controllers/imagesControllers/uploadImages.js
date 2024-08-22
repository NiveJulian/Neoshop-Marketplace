const multiparty = require("multiparty");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");
const dotenv = require("dotenv");
dotenv.config();

const bucketName = process.env.S3_BUCKET;

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

//Esta funcion recibe un imagenes, las sube a AWS y nos devuelven los links de las imagenes
//? Es necesario tener estos parametros en el el archivo.env
/*
S3_ACCESS_KEY=
S3_SECRET_ACCESS_KEY=
S3_BUCKET= 
*/
async function uploadToS3(req, res) {
  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    const links = [];

    if (files.file) {
      for (const file of files.file) {
        const ext = file.originalFilename.split(".").pop();
        const newFilename = Date.now() + "." + ext;

        const fileStream = fs.createReadStream(file.path);

        const uploadParams = {
          Bucket: bucketName,
          Key: newFilename,
          Body: fileStream,
          ACL: "public-read",
          ContentType: mime.lookup(file.path) || 'application/octet-stream',
        };

        try {
          await s3Client.send(new PutObjectCommand(uploadParams));
          const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
          links.push(link);
        } catch (error) {
          console.error("Error uploading file to S3:", error);
          return res.status(500).json({ error: "Error uploading file to S3" });
        }
      }
    } else {
      console.error("No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log(links);
    return res.status(200).json({ links });
  });
}

module.exports = uploadToS3;
