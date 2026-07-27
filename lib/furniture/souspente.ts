import type { FurnitureType } from '@/types'
import { Builder, T, cm, num, m2 } from './helpers'

/**
 * Meuble sous pente — caisson dont le dessus suit le rampant. Chaque colonne est
 * plus haute que la précédente et ses étagères s'arrêtent sous la pente.
 */
export const souspente: FurnitureType = {
  key: 'souspente',
  label: 'Meuble sous pente',
  tagline: 'Le dessus suit le rampant : chaque colonne gagne en hauteur.',
  options: ['optPortes', 'optMiroir', 'optLumiere', 'optTiroirs'],
  // Le panneau de dessus, incliné, déborde légèrement la largeur nominale.
  maxDims: { w: 4.05, h: 2.8, d: 0.8 },
  params: [
    { kind: 'number', key: 'largeur', label: 'Largeur', min: 100, max: 400, step: 10, def: 240 },
    { kind: 'number', key: 'hautBasse', label: 'Hauteur côté bas', min: 60, max: 160, step: 5, def: 110 },
    { kind: 'number', key: 'hautHaute', label: 'Hauteur côté haut', min: 120, max: 280, step: 5, def: 240 },
    { kind: 'number', key: 'profondeur', label: 'Profondeur', min: 40, max: 80, step: 5, def: 60 },
    { kind: 'number', key: 'colonnes', label: 'Colonnes', min: 1, max: 5, step: 1, unit: '', def: 3 },
  ],

  build(config, color) {
    const b = new Builder(color)
    const w = cm(num(config, 'largeur'))
    const d = cm(num(config, 'profondeur'))
    const n = num(config, 'colonnes')
    // On garde le côté bas réellement plus bas, même si le client croise les curseurs.
    const hb = Math.min(cm(num(config, 'hautBasse')), cm(num(config, 'hautHaute')))
    const hh = Math.max(cm(num(config, 'hautBasse')), cm(num(config, 'hautHaute')))

    /** Hauteur du rampant à l'abscisse x. */
    const slope = (x: number) => hb + ((hh - hb) * (x + w / 2)) / w

    // Joues : celle de gauche s'arrête plus bas que celle de droite
    b.box(T, hb, d, -w / 2 + T / 2, hb / 2, 0)
    b.box(T, hh, d, w / 2 - T / 2, hh / 2, 0)
    // Fond trapézoïdal
    b.shape(
      [
        [-w / 2, 0],
        [w / 2, 0],
        [w / 2, hh],
        [-w / 2, hb],
      ],
      T,
      -d / 2,
    )
    b.box(w, T, d, 0, T / 2, 0)

    // Panneau de dessus, incliné le long du rampant
    const angle = Math.atan2(hh - hb, w)
    const top = b.box(Math.hypot(w, hh - hb), T, d, 0, (hb + hh) / 2 - T / 2, 0)
    top.rotation.z = angle

    const innerW = w - 2 * T
    const colW = innerW / n

    for (let i = 1; i < n; i++) {
      const x = -w / 2 + T + colW * i
      const local = slope(x) - T
      b.box(T, local, d - T, x, local / 2, T / 2)
    }

    // Une étagère par colonne, à mi-hauteur de la colonne
    for (let c = 0; c < n; c++) {
      const x = -w / 2 + T + colW * (c + 0.5)
      b.box(colW - T, T, d - T, x, slope(x) / 2, T / 2)
    }

    return b.center()
  },

  // TARIFS PROVISOIRES — à caler avec le client
  price(config) {
    const hMoy = (num(config, 'hautBasse') + num(config, 'hautHaute')) / 2
    const surface = m2(num(config, 'largeur'), hMoy)
    const volume = surface * (num(config, 'profondeur') / 100)
    // La découpe biaise coûte plus cher au m² qu'un caisson droit.
    return surface * 210 + volume * 120 + num(config, 'colonnes') * 45
  },
}
