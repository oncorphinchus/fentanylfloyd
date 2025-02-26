'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FancyButtonProps {
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  className?: string
}

export function FancyButton({ onClick, disabled, children, className = '' }: FancyButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { 
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      className={`bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className}`}
    >
      {children}
    </motion.button>
  )
} 