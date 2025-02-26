import { S3Client } from '@aws-sdk/client-s3'

export const BUCKET_NAME = process.env.BUCKET_NAME

if (!BUCKET_NAME) {
  throw new Error('BUCKET_NAME is not defined')
}

export const s3Client = new S3Client({
  region: process.env.CUSTOM_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
}) 