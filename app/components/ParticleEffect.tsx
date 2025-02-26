'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  duration: number
}

export function ParticleEffect() {
  const [particles, setParticles] = useState<Particle[]>([])

  const generateParticles = useCallback(() => {
    const colors = ['#FF69B4', '#4169E1', '#9400D3', '#00CED1']
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2
    }))
  }, [])

  useEffect(() => {
    setParticles(generateParticles())
  }, [generateParticles])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [-20, 20],
            y: [-20, 20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
} 