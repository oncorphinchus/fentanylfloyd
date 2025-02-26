'use client'

import { motion, Variants, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

// Types for our animation components
interface AnimationProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

// Floating animation with customizable parameters
export const FloatingElement = ({
  children,
  delay = 0,
  duration = 2,
  className = "",
  ...props
}: AnimationProps) => {
  const floatingVariants: Variants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      },
    },
  }

  return (
    <motion.div
      variants={floatingVariants}
      initial="initial"
      animate="animate"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Fade-in animation with scale
export const FadeInScale = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  ...props
}: AnimationProps) => {
  const fadeInVariants: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Staggered children animation
export const StaggerContainer = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  ...props
}: AnimationProps) => {
  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={className}
      {...props}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

// Hover effect with spring animation
export const SpringHover = ({
  children,
  className = "",
  ...props
}: AnimationProps) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotate: [-1, 1],
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
        },
      }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Magnetic hover effect
export const MagneticButton = ({
  children,
  className = "",
  ...props
}: AnimationProps) => {
  const magneticVariants: Variants = {
    hover: (point: { x: number; y: number }) => ({
      x: point.x,
      y: point.y,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 15,
      },
    }),
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * 0.2
    const y = (clientY - (top + height / 2)) * 0.2
    currentTarget.style.setProperty("--x", `${x}px`)
    currentTarget.style.setProperty("--y", `${y}px`)
  }

  return (
    <motion.div
      variants={magneticVariants}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      className={`relative ${className}`}
      style={{
        transform: "translate(var(--x, 0), var(--y, 0))",
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
} 