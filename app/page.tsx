'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'
import { FadeInScale } from './components/Animations'
import { FancyButton } from './components/FancyButton'

export default function Home() {
  const [customPath, setCustomPath] = useState('')
  const router = useRouter()

  const handleCreatePage = () => {
    const pageId = customPath || nanoid(10)
    router.push(`/${pageId}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      <FadeInScale className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Fentstash
          </h1>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <input
              type="text"
              value={customPath}
              onChange={(e) => setCustomPath(e.target.value)}
              className="w-full bg-transparent text-white border border-white/20 rounded-lg p-4 mb-4 focus:ring-2 ring-purple-500 outline-none"
              placeholder="Enter custom path (optional)"
            />
            
            <FancyButton
              onClick={handleCreatePage}
              className="w-full"
            >
              Create Clipboard
            </FancyButton>
          </div>
        </div>
      </FadeInScale>
    </main>
  )
}