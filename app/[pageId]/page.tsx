'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ClipboardIcon } from '../components/ClipboardIcon'
import { CopyNotification } from '../components/CopyNotification'
import { FadeInScale } from '../components/Animations'
import { ParticleEffect } from '../components/ParticleEffect'
import { HomeButton } from '../components/HomeButton'
import { FancyButton } from '../components/FancyButton'

export default function ClipboardPage() {
  const params = useParams()
  const pageId = params.pageId as string
  
  const [clipboardContent, setClipboardContent] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const background = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(29, 78, 216, 0.15),
    transparent 80%
  )`

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/api/clipboard?pageId=${pageId}`)
        if (response.ok) {
          const data = await response.json()
          setClipboardContent(data.content)
          // Don't set isSaved to true on initial load
        }
      } catch {
        setError('Failed to load content')
      }
    }
    loadContent()
  }, [pageId])

  const handleSave = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await fetch('/api/clipboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: clipboardContent,
          pageId,
        }),
      })
      setIsSaved(true)
    } catch {
      setError('Failed to save content')
    } finally {
      setIsLoading(false)
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
    } catch {
      setError('Failed to copy to clipboard')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 relative overflow-hidden">
      <HomeButton />
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

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <textarea
              value={clipboardContent}
              onChange={(e) => {
                setClipboardContent(e.target.value)
                setIsSaved(false)
              }}
              className="w-full h-40 bg-transparent text-white border border-white/20 rounded-lg p-4 mono focus:ring-2 ring-purple-500 outline-none"
              placeholder="Paste your content here..."
              disabled={isLoading}
            />
            
            <FancyButton
              onClick={handleSave}
              disabled={isLoading || isSaved}
              className="mt-4"
            >
              {isLoading ? 'Saving...' : isSaved ? 'Saved!' : 'Save'}
            </FancyButton>
            
            <FancyButton
              onClick={handleCopy}
              disabled={isLoading || !clipboardContent}
              className="ml-4 mt-4"
            >
              {isLoading ? 'Copying...' : 'Copy to Clipboard'}
            </FancyButton>
            
            {error && (
              <p className="mt-2 text-red-400 text-sm">{error}</p>
            )}
          </div>
        </motion.div>
      </FadeInScale>
      
      <CopyNotification show={showNotification} />
    </main>
  )
} 