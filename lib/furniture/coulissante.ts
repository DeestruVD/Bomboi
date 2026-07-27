import type { FurnitureType } from '@/types'
import { Builder, METAL, cm, num, m2 } from './helpers'

/**
 * Porte coulissante — vantaux qui se croisent sur un rail haut, dans un
 * encadrement. Chaque vantail occupe son propre plan de coulissement.
 */
export const coulissante: FurnitureType = {
  key: 'coulissante',
  label: 'Porte coulissante',
  tagline: 'Vantaux décalés en profondeur, suspendus à un rail haut.',
  options: ['optMiroir', 'optLumiere'],
  // L'encadrement ajoute un jambage de chaque côté et un linteau au-dessus.
  maxDims: { w: 4.15, h: 2.9, d: 0.25 },
  params: [
    { kind: 'number', key: 'largeur', label: 'Largeur de baie', min: 100, max: 400, step: 10, def: 200 },
    { kind: 'number', key: 'hauteur', label: 'Hauteur', min: 180, max: 280, step: 5, def: 220 },
    { kind: 'number', key: 'vantaux', label: 'Vantaux', min: 2, max: 4, step: 1, unit: '', def: 2 },
    { kind: 'number', key: 'epaisseur', label: 'Épaisseur de vantail', min: 2, max: 5, step: 0.5, def: 3 },
  ],

  build(config, color) {
    const b = new Builder(color)
    const w = cm(num(config, 'largeur'))
    const h = cm(num(config, 'hauteur'))
    const n = num(config, 'vantaux')
    const e = cm(num(config, 'epaisseur'))

    const metal = b.material(METAL, { rough: 0.35, metal: 0.8 })
    const frameD = 0.14
    const jamb = 0.06

    // Encadrement
    b.box(jamb, h, frameD, -w / 2 - jamb / 2, h / 2, 0)
    b.box(jamb, h, frameD, w / 2 + jamb / 2, h / 2, 0)
    b.box(w + 2 * jamb, jamb, frameD, 0, h + jamb / 2, 0)

    // Rail
    b.box(w + 2 * jamb, 0.03, 0.05, 0, h - 0.03, 0.02, metal)

    // Vantaux : recouvrement latéral, et un plan de coulissement par vantail
    const panelW = (w / n) * 1.15
    const travel = n > 1 ? (w - panelW) / (n - 1) : 0
    const panelH = h - 0.06

    for (let i = 0; i < n; i++) {
      const x = -w / 2 + panelW / 2 + travel * i
      const z = (i - (n - 1) / 2) * (e + 0.01)
      b.box(panelW, panelH, e, x, panelH / 2 + 0.02, z)
      // Poignée encastrée sur le chant menant
      b.box(0.02, 0.3, e + 0.006, x + panelW / 2 - 0.05, h * 0.45, z, metal)
    }

    return b.center()
  },

  // TARIFS PROVISOIRES — à caler avec le client
  price(config) {
    const surface = m2(num(config, 'largeur'), num(config, 'hauteur'))
    return surface * 260 + num(config, 'vantaux') * 190 + 240
  },
}
