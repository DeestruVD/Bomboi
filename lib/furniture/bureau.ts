import type { FurnitureType } from '@/types'
import { Builder, T, cm, num, str, m2 } from './helpers'

const PLATEAU = 0.04
const CAISSON_W = 0.42

/**
 * Bureau — plateau porté par un caisson à tiroirs d'un côté et un piètement de
 * l'autre. Sans caisson, il repose sur quatre pieds.
 */
export const bureau: FurnitureType = {
  key: 'bureau',
  label: 'Bureau',
  tagline: 'Plateau sur caisson à tiroirs, piètement de l’autre côté.',
  options: ['optLumiere'],
  maxDims: { w: 2.8, h: 0.8, d: 0.9 },
  params: [
    { kind: 'number', key: 'longueur', label: 'Longueur', min: 100, max: 280, step: 10, def: 160 },
    { kind: 'number', key: 'profondeur', label: 'Profondeur', min: 50, max: 90, step: 5, def: 70 },
    { kind: 'number', key: 'hauteur', label: 'Hauteur', min: 70, max: 80, step: 1, def: 75 },
    { kind: 'number', key: 'tiroirs', label: 'Tiroirs', min: 0, max: 4, step: 1, unit: '', def: 3 },
    {
      kind: 'choice',
      key: 'caisson',
      label: 'Caisson',
      choices: [
        { value: 'gauche', label: 'À gauche' },
        { value: 'droite', label: 'À droite' },
        { value: 'aucun', label: 'Aucun' },
      ],
      def: 'gauche',
    },
  ],

  build(config, color) {
    const b = new Builder(color)
    const l = cm(num(config, 'longueur'))
    const p = cm(num(config, 'profondeur'))
    const h = cm(num(config, 'hauteur'))
    const k = num(config, 'tiroirs')
    const cote = str(config, 'caisson')

    b.box(l, PLATEAU, p, 0, h - PLATEAU / 2, 0)

    const bodyH = h - PLATEAU
    const caissonD = p - 0.06

    /** Deux pieds droits sur un côté du plateau. */
    const leg = (x: number) => {
      for (const sz of [-1, 1]) {
        b.box(0.06, bodyH, 0.06, x, bodyH / 2, sz * (p / 2 - 0.08))
      }
    }

    if (cote === 'aucun') {
      leg(-l / 2 + 0.08)
      leg(l / 2 - 0.08)
    } else {
      const sign = cote === 'gauche' ? -1 : 1
      const cx = sign * (l / 2 - CAISSON_W / 2 - 0.04)

      // Caisson : joues, fond, dessous
      b.box(T, bodyH, caissonD, cx - CAISSON_W / 2 + T / 2, bodyH / 2, 0)
      b.box(T, bodyH, caissonD, cx + CAISSON_W / 2 - T / 2, bodyH / 2, 0)
      b.box(CAISSON_W, T, caissonD, cx, T / 2, 0)
      b.box(CAISSON_W, bodyH, T, cx, bodyH / 2, -caissonD / 2 + T / 2)

      if (k > 0) {
        const dh = (bodyH - T) / k
        for (let i = 0; i < k; i++) {
          b.box(CAISSON_W - 2 * T, dh - 0.008, T, cx, T + dh * (i + 0.5), caissonD / 2 - T / 2)
        }
      }

      leg(-sign * (l / 2 - 0.08))
    }

    return b.center()
  },

  // TARIFS PROVISOIRES — à caler avec le client
  price(config) {
    const plateau = m2(num(config, 'longueur'), num(config, 'profondeur'))
    const caisson = str(config, 'caisson') === 'aucun' ? 0 : 380
    return plateau * 480 + caisson + num(config, 'tiroirs') * 140 + 220
  },
}
