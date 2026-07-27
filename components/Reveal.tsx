'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Révèle son contenu à l'entrée dans l'écran, une seule fois.
 *
 * Le composant se contente de poser une classe sur un conteneur : ce sont les
 * éléments marqués par `revealed()` à l'intérieur qui portent l'animation, via
 * le CSS de globals.css. Aucune bibliothèque, aucun octet ajouté au bundle.
 *
 * On enveloppe des sections entières depuis app/page.tsx plutôt que des
 * éléments isolés : le conteneur reste un bloc dans le flux, la mise en page
 * des sections n'est donc pas touchée.
 */
export default function Reveal({
  children,
  immediate = false,
}: {
  children: ReactNode
  /** Pour le hero : s'anime au chargement, sans attendre le défilement. */
  immediate?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (immediate) {
      // Une frame d'attente pour que l'état masqué soit peint : sans ça, le
      // navigateur passe directement à l'état final et la transition saute.
      const frame = requestAnimationFrame(() => setShown(true))
      return () => cancelAnimationFrame(frame)
    }

    const el = ref.current
    if (!el) return

    // Navigateur sans IntersectionObserver : on montre tout plutôt que rien.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      // On attend que la section soit franchement entrée avant de déclencher.
      { rootMargin: '0px 0px -15% 0px', threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [immediate])

  return (
    <div ref={ref} className={`reveal-root${shown ? ' is-revealed' : ''}`}>
      {children}
    </div>
  )
}

// Les helpers revealed() / revealedGlow() vivent dans lib/reveal.ts : ils
// doivent rester appelables depuis les composants rendus côté serveur.
