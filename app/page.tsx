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
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-KMQY2SXDMY"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KMQY2SXDMY');
</script>

        </div>
      </FadeInScale>
    </main>
  )
}
