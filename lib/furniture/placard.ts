import type { FurnitureType } from '@/types'
import { Builder, T, cm, num, m2 } from './helpers'

/**
 * Placard droit — le caisson d'origine du configurateur : montants, traverses,
 * fond, séparations verticales et une étagère par colonne.
 */
export const placard: FurnitureType = {
  key: 'placard',
  label: 'Placard droit',
  tagline: 'Caisson fermé, séparations verticales et une étagère par colonne.',
  options: ['optPortes', 'optMiroir', 'optLumiere', 'optTiroirs'],
  maxDims: { w: 4, h: 2.8, d: 0.8 },
  params: [
    { kind: 'number', key: 'largeur', label: 'Largeur', min: 120, max: 400, step: 10, def: 200 },
    { kind: 'number', key: 'hauteur', label: 'Hauteur', min: 180, max: 280, step: 10, def: 220 },
    { kind: 'number', key: 'profondeur', label: 'Profondeur', min: 40, max: 80, step: 5, def: 60 },
    { kind: 'number', key: 'colonnes', label: 'Colonnes', min: 1, max: 6, step: 1, unit: '', def: 3 },
  ],

  build(config, color) {
    const b = new Builder(color)
    const w = cm(num(config, 'largeur'))
    const h = cm(num(config, 'hauteur'))
    const d = cm(num(config, 'profondeur'))
    const n = num(config, 'colonnes')

    // Montants, traverses et fond
    b.box(T, h, d, -w / 2 + T / 2, h / 2, 0)
    b.box(T, h, d, w / 2 - T / 2, h / 2, 0)
    b.box(w, T, d, 0, h - T / 2, 0)
    b.box(w, T, d, 0, T / 2, 0)
    b.box(w, h, T, 0, h / 2, -d / 2 + T / 2)

    const innerW = w - 2 * T
    const colW = innerW / n

    // Séparations verticales
    for (let i = 1; i < n; i++) {
      b.box(T, h - 2 * T, d - T, -w / 2 + T + colW * i, h / 2, T / 2)
    }

    // Une étagère à mi-hauteur par colonne
    for (let c = 0; c < n; c++) {
      b.box(colW - T, T, d - T, -w / 2 + T + colW * (c + 0.5), h / 2, T / 2)
    }

    return b.center()
  },

  // TARIFS PROVISOIRES — à caler avec le client
  price(config) {
    const surface = m2(num(config, 'largeur'), num(config, 'hauteur'))
    const volume = surface * (num(config, 'profondeur') / 100)
    return surface * 180 + volume * 120 + num(config, 'colonnes') * 45
  },
}
