import React, { useEffect, useState } from 'react'

const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let animationFrame
    const startTime = performance.now()
    const duration = 1200
    
    const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4)
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(1, elapsed / duration)
      const easedProgress = easeOutQuart(progress)
      
      setDisplayValue(Math.floor(easedProgress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value])

  return (
    <span className="tabular-nums font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
      {displayValue.toLocaleString()}
    </span>
  )
}

export default AnimatedCounter