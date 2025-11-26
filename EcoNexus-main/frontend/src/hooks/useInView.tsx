import { useEffect, useState, RefObject } from 'react'

export default function useInView<T extends HTMLElement>(ref: RefObject<T>, options?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setInView(true)
      })
    }, options)
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref.current])

  return inView
}
