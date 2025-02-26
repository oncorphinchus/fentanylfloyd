'use client'

import { motion, AnimatePresence } from 'framer-motion'

export function CopyNotification({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
        >
          Copied to clipboard!
        </motion.div>
      )}
    </AnimatePresence>
  )
} 