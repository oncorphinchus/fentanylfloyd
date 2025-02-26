'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export function HomeButton() {
  const router = useRouter()

  return (
    <motion.button
      onClick={() => router.push('/')}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      className="fixed top-4 left-4 bg-white/10 backdrop-blur-lg p-3 rounded-full z-50"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    </motion.button>
  )
} 