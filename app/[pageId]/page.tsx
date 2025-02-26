'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useState } from 'react'
import { ClipboardIcon } from '../components/ClipboardIcon'
import { CopyNotification } from '../components/CopyNotification'
import { FadeInScale, SpringHover } from '../components/Animations'
import { ParticleEffect } from '../components/ParticleEffect'

export default function ClipboardPage() {
  const params = useParams()
  const pageId = params.pageId as string
  
  const [clipboardContent, setClipboardContent] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const background = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(29, 78, 216, 0.15),
    transparent 80%
  )`

  // Load clipboard content when page loads
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/clipboard?pageId=${pageId}`)
        if (!response.ok) {
          throw new Error('Failed to load content')
        }
        const data = await response.json()
        setClipboardContent(data.content)
      } catch (err) {
        setError('Failed to load clipboard content')
      } finally {
        setIsLoading(false)
      }
    }

    loadContent()
  }, [pageId])

  // Save content to S3 when it changes
  const handleContentChange = async (content: string) => {
    try {
      setClipboardContent(content)
      await fetch('/api/clipboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          pageId,
        }),
      })
    } catch (err) {
      setError('Failed to save content')
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const { currentTarget, clientX, clientY } = e
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const handleCopy = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await navigator.clipboard.writeText(clipboardContent)
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 relative overflow-hidden">
      <ParticleEffect />
      
      <FadeInScale className="container mx-auto px-4 py-16 relative">
        <motion.div
          className="relative rounded-2xl"
          onMouseMove={handleMouseMove}
          style={{ background }}
        >
          <div className="mx-auto mb-8 flex justify-center">
            <ClipboardIcon />
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <textarea
              value={clipboardContent}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full h-40 bg-transparent text-white border border-white/20 rounded-lg p-4 mono focus:ring-2 ring-purple-500 outline-none"
              placeholder="Paste your content here..."
              disabled={isLoading}
            />
            
            <SpringHover>
              <button
                onClick={handleCopy}
                disabled={isLoading || !clipboardContent}
                className={`mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full transition-all
                  ${isLoading || !clipboardContent ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/20'}`}
              >
                {isLoading ? 'Copying...' : 'Copy to Clipboard'}
              </button>
            </SpringHover>
            
            {error && (
              <p className="mt-2 text-red-400 text-sm">{error}</p>
            )}
          </motion.div>
        </motion.div>
      </FadeInScale>
      
      <CopyNotification show={showNotification} />
    </main>
  )
} 