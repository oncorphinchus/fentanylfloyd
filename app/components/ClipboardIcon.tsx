'use client'

import { motion } from 'framer-motion'

export function ClipboardIcon() {
  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        pathLength: { duration: 3.5, ease: "easeInOut" },
        opacity: { duration: 1 }
      }
    }
  }

  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
      initial="initial"
      animate="animate"
    >
      <motion.path
        variants={pathVariants}
        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.rect
        variants={pathVariants}
        x="8"
        y="2"
        width="8"
        height="4"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <motion.path
        variants={pathVariants}
        d="M9 12h6M9 16h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  )
} 