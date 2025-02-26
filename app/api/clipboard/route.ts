import { NextResponse } from 'next/server'
import { s3Client, BUCKET_NAME } from '@/app/lib/aws-config'
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { nanoid } from 'nanoid'

export async function POST(request: Request) {
  try {
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

    return NextResponse.json({ success: true, pageId })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save clipboard content' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')

    if (!pageId) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 })
    }

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: pageId,
    })

    const response = await s3Client.send(command)
    const data = await response.Body?.transformToString()
    
    if (!data) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }

    const { content, expirationDate } = JSON.parse(data)
    
    if (new Date(expirationDate) < new Date()) {
      await s3Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: pageId,
      }))
      return NextResponse.json({ error: 'Content expired' }, { status: 404 })
    }

    return NextResponse.json({ content })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve clipboard content' }, { status: 500 })
  }
} 