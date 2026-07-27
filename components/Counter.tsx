'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Chiffre qui grimpe jusqu'à sa valeur quand il entre dans l'écran.
 *
 * Repris du site de référence, qui anime ses chiffres clés de la même façon.
 * Le compte s'arrête net sur la valeur exacte : un compteur qui affiche autre
 * chose que le chiffre annoncé décrédibilise la statistique.
 */
export default function Counter({
  value,
  suffix = '',
  duration = 1600,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setDisplay(value)
      return
    }

    let frame = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        // Même décélération que les révélations, pour que tout respire pareil.
        const eased = 1 - Math.pow(1 - t, 4)
        setDisplay(Math.round(value * eased))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          run()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration])

  return (
    <span ref={ref}>
      {display.toLocaleString('fr-BE')}
      {suffix}
    </span>
  )
}
