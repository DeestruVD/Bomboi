import type { CSSProperties } from 'react'

/**
 * Helpers de révélation, volontairement hors de components/Reveal.tsx.
 *
 * Ce fichier ne porte pas `'use client'` : les sections rendues côté serveur
 * (Hero, Expertise, Gallery, Process, Footer) doivent pouvoir appeler ces
 * fonctions au prérendu. Importées depuis un module client, elles seraient
 * remplacées par une référence proxy et le rendu échouerait.
 */

/**
 * Sens d'arrivée. Les entrées latérales et le zoom viennent du site de
 * référence ; la courbe et la cascade restent celles retenues en maquette.
 */
export type RevealDirection = 'up' | 'left' | 'right' | 'zoom'

/**
 * Marque un élément à révéler : son rang dans la cascade et son sens d'arrivée.
 * À étaler : `<h2 {...revealed(1, 'left')} className="…">`.
 *
 * Le troisième argument fusionne un style en ligne existant — plusieurs titres
 * du site portent déjà un `fontSize` fluide qu'il ne faut pas écraser.
 */
export function revealed(
  rank = 0,
  direction: RevealDirection = 'up',
  style?: CSSProperties,
): {
  'data-reveal': RevealDirection
  style: CSSProperties & { '--i': number }
} {
  return { 'data-reveal': direction, style: { ...style, '--i': rank } }
}

/** Variante pour les fonds atmosphériques, qui dérivent plus lentement. */
export function revealedGlow(): { 'data-reveal-glow': string } {
  return { 'data-reveal-glow': '' }
}
