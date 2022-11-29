import AWS from 'aws-sdk';
import { v4 } from 'uuid';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_SECRET_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

export async function uploadS3(folder, files) {
  const params = files.map((file) => {
    const extension = file.mimetype.split('/')[1];
    return {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${folder}/${v4()}.${extension}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
}
