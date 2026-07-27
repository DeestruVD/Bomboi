import type { FurnitureType } from '@/types'
import { Builder, METAL, cm, num, str, m2 } from './helpers'

const LEAF = 0.04 // épaisseur d'un vantail
const OPEN = 0.45 // angle d'ouverture affiché, en radians

/**
 * Portes — vantaux battants à panneaux dans leur bâti. Les ouvrants sont
 * représentés entrebâillés : c'est ce qui les distingue d'un simple panneau.
 */
export const portes: FurnitureType = {
  key: 'portes',
  label: 'Portes',
  tagline: 'Battants à panneaux dans leur bâti, montrés entrebâillés.',
  options: ['optMiroir'],
  // Profondeur dictée par le vantail unique le plus large, qui débat le plus loin.
  maxDims: { w: 1.8, h: 2.7, d: 0.85 },
  params: [
    { kind: 'number', key: 'largeur', label: 'Largeur de passage', min: 60, max: 160, step: 5, def: 90 },
    { kind: 'number', key: 'hauteur', label: 'Hauteur', min: 190, max: 260, step: 5, def: 210 },
    { kind: 'number', key: 'vantaux', label: 'Vantaux', min: 1, max: 2, step: 1, unit: '', def: 1 },
    { kind: 'number', key: 'panneaux', label: 'Panneaux par vantail', min: 0, max: 4, step: 1, unit: '', def: 2 },
    {
      kind: 'choice',
      key: 'sens',
      label: 'Charnières',
      choices: [
        { value: 'gauche', label: 'À gauche' },
        { value: 'droite', label: 'À droite' },
      ],
      def: 'gauche',
    },
  ],

  build(config, color) {
    const b = new Builder(color)
    const w = cm(num(config, 'largeur'))
    const h = cm(num(config, 'hauteur'))
    const n = num(config, 'vantaux')
    const p = num(config, 'panneaux')

    const metal = b.material(METAL, { rough: 0.3, metal: 0.85 })
    const jamb = 0.07
    const frameD = 0.14

    // Bâti
    b.box(jamb, h + jamb, frameD, -w / 2 - jamb / 2, (h + jamb) / 2, 0)
    b.box(jamb, h + jamb, frameD, w / 2 + jamb / 2, (h + jamb) / 2, 0)
    b.box(w + 2 * jamb, jamb, frameD, 0, h + jamb / 2, 0)

    const leafW = w / n
    // Un vantail seul pivote du côté choisi ; une double porte s'ouvre en deux.
    const hingeLeft = n === 2 ? [true, false] : [str(config, 'sens') === 'gauche']

    hingeLeft.forEach((left, i) => {
      const hingeX = left ? -w / 2 + leafW * i : -w / 2 + leafW * (i + 1)
      const dir = left ? 1 : -1 // sens dans lequel le vantail s'étend depuis ses charnières

      b.pivot(hingeX, 0, 0, left ? -OPEN : OPEN, () => {
        const cx = (dir * leafW) / 2
        b.box(leafW - 0.008, h - 0.008, LEAF, cx, h / 2, 0)

        // Panneaux rapportés sur la face avant
        if (p > 0) {
          const margin = 0.1
          const panelH = (h - margin * (p + 1)) / p
          for (let j = 0; j < p; j++) {
            b.box(
              leafW - 0.2,
              panelH,
              0.012,
              cx,
              margin * (j + 1) + panelH * (j + 0.5),
              LEAF / 2 + 0.006,
            )
          }
        }

        // Béquille côté ouvrant
        b.box(0.03, 0.14, 0.06, cx + dir * (leafW / 2 - 0.07), h * 0.48, LEAF / 2 + 0.03, metal)
      })
    })

    return b.center()
  },

  // TARIFS PROVISOIRES — à caler avec le client
  price(config) {
    const surface = m2(num(config, 'largeur'), num(config, 'hauteur'))
    const n = num(config, 'vantaux')
    return surface * 460 + num(config, 'panneaux') * n * 55 + n * 180
  },
}
