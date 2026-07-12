import { useEffect, useRef, useState } from 'react'

const DURATION = 400

export default function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const frameRef = useRef<number>()

  useEffect(() => {
    const from = fromRef.current
    if (from === value) return
    const start = performance.now()

    function tick(now: number) {
      const t = Math.min(1, (now - start) / DURATION)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(from + (value - from) * eased))
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = value
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [value])

  return <>{display}</>
}
