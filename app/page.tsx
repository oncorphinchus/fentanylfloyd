'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'
import { FadeInScale } from './components/Animations'
import { FancyButton } from './components/FancyButton'
import Script from 'next/script' // Import Next.js Script component

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
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8"> {/* Added mb-8 for spacing below this div */}
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

          {/* Yve's Chatbot Section - Centered and below the typing field */}
        
              {/* Using Script component to load external JS, strategy="afterInteractive" is good for chat widgets */}
              <Script
                async
                src="https://ir76fjq5jybic4ap2xj4sjzl.agents.do-ai.run/static/chatbot/widget.js"
                data-agent-id="11b0efd1-4d1b-11f0-bf8f-4e013e2ddde4"
                data-chatbot-id="0UsObW6IvqsWw65bR_w4kmiA_zCE4I88"
                data-name="Yve ur twinkie faggot chatbot"
                data-primary-color="#5B21B6" // Adjusted to a darker purple from your gradient
                data-secondary-color="#C084FC" // Adjusted to a lighter purple for contrast
                data-button-background-color="#8B5CF6" // Adjusted to a vibrant purple
                data-starting-message="Haiiiiii, I'm Yve! 💅✨ Ready for some deranged chat? Let's talk about anal intercourse and my hate for niggers! 😉🐾"
                data-logo="https://www.svgrepo.com/show/304593/gay-flag.svg"
                strategy="afterInteractive" // Recommended for third-party scripts
              ></Script>

        </div>
      </FadeInScale>
    </main>
  )
}
