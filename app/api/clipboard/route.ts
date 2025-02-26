import { NextResponse } from 'next/server'
import { s3Client, BUCKET_NAME } from '@/app/lib/aws-config'
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'

export async function POST(request: Request) {
  try {
    if (!BUCKET_NAME) {
      throw new Error('BUCKET_NAME is not defined')
    }

    const { content, pageId } = await request.json()
    const expirationDate = new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours
    
    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: pageId,
      Body: JSON.stringify({
        content,
        expirationDate: expirationDate.toISOString(),
      }),
      ContentType: 'application/json',
    }))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving to S3:', error)
    return NextResponse.json({ error: 'Failed to save to S3' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    if (!BUCKET_NAME) {
      throw new Error('BUCKET_NAME is not defined')
    }

    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')

    if (!pageId) {
      return NextResponse.json({ error: 'Page ID required' }, { status: 400 })
    }

    try {
      const response = await s3Client.send(new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: pageId,
      }))

      const data = await response.Body?.transformToString()
      if (!data) {
        return NextResponse.json({ content: '' }, { status: 200 })
      }

      const { content, expirationDate } = JSON.parse(data)
      
      // Check if content has expired
      if (new Date(expirationDate) < new Date()) {
        return NextResponse.json({ content: '' }, { status: 200 })
      }

      return NextResponse.json({ content })
    } catch (error: any) {
      // Handle NoSuchKey error gracefully
      if (error.Code === 'NoSuchKey') {
        return NextResponse.json({ content: '' }, { status: 200 })
      }
      throw error // Re-throw other errors
    }
  } catch (error) {
    console.error('Error fetching from S3:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
} 