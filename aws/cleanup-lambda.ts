import { S3Client, ListObjectsV2Command, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'

if (!process.env.CUSTOM_AWS_REGION) {
  throw new Error('CUSTOM_AWS_REGION is not defined')
}

if (!process.env.AWS_BUCKET_NAME) {
  throw new Error('AWS_BUCKET_NAME is not defined')
}

const s3Client = new S3Client({ region: process.env.CUSTOM_AWS_REGION })
const BUCKET_NAME = process.env.AWS_BUCKET_NAME

export const handler = async () => {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
    })

    const { Contents } = await s3Client.send(listCommand)
    
    if (!Contents) return

    for (const object of Contents) {
      const getCommand = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: object.Key,
      })

      try {
        const response = await s3Client.send(getCommand)
        const data = await response.Body?.transformToString()
        
        if (data) {
          const { expirationDate } = JSON.parse(data)
          
          if (new Date(expirationDate) < new Date()) {
            await s3Client.send(new DeleteObjectCommand({
              Bucket: BUCKET_NAME,
              Key: object.Key,
            }))
          }
        }
      } catch (error) {
        console.error(`Error processing object ${object.Key}:`, error)
      }
    }
  } catch (error) {
    console.error('Error in cleanup process:', error)
  }
} 