import { S3Client } from '@aws-sdk/client-s3'

// Check for environment variables at runtime
const requiredEnvVars = {
  BUCKET_NAME: process.env.BUCKET_NAME!,
  AWS_REGION: process.env.AWS_REGION!,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
} as const

// Validate all required environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`${key} environment variable is not defined`)
  }
})

export const BUCKET_NAME = requiredEnvVars.BUCKET_NAME

export const s3Client = new S3Client({
  region: requiredEnvVars.AWS_REGION,
  credentials: {
    accessKeyId: requiredEnvVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: requiredEnvVars.AWS_SECRET_ACCESS_KEY,
  }
}) 