import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, inView]. Attaches an IntersectionObserver to `ref`.
 * Once the element enters the viewport, inView becomes true and
 * the observer disconnects (fires once).
 *
 * @param {IntersectionObserverInit} options
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, ...options },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
