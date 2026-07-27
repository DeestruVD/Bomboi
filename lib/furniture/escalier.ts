import type { FurnitureType } from '@/types'
import { Builder, cm, num, bool } from './helpers'

const TREAD = 0.04 // épaisseur d'une marche
const RISER = 0.03 // épaisseur d'une contremarche
const STRINGER = 0.3 // hauteur du limon

/**
 * Escalier — volée droite : marches, contremarches optionnelles et deux limons
 * latéraux. Les quarts tournants ne sont pas gérés par le configurateur.
 */
export const escalier: FurnitureType = {
  key: 'escalier',
  label: 'Escalier',
  tagline: 'Volée droite sur deux limons. Un quart tournant se chiffre sur place.',
  options: ['optLumiere'],
  // Les limons débordent la volée en hauteur comme en longueur.
  maxDims: { w: 1.5, h: 3.8, d: 7 },
  params: [
    { kind: 'number', key: 'monter', label: 'Hauteur à monter', min: 200, max: 350, step: 5, def: 280 },
    { kind: 'number', key: 'marches', label: 'Marches', min: 10, max: 20, step: 1, unit: '', def: 16 },
    { kind: 'number', key: 'giron', label: 'Giron', min: 22, max: 34, step: 1, def: 28 },
    { kind: 'number', key: 'largeur', label: 'Largeur', min: 70, max: 140, step: 5, def: 90 },
    { kind: 'toggle', key: 'contremarches', label: 'Contremarches fermées', def: true },
  ],

  build(config, color) {
    const b = new Builder(color)
    const ht = cm(num(config, 'monter'))
    const n = num(config, 'marches')
    const g = cm(num(config, 'giron'))
    const w = cm(num(config, 'largeur'))
    const fermé = bool(config, 'contremarches')

    const rise = ht / n
    const run = g * n

    for (let i = 0; i < n; i++) {
      const y = (i + 1) * rise
      // La volée monte en s'éloignant : la marche du bas est la plus proche.
      const z = run / 2 - g * (i + 0.5)
      b.box(w, TREAD, g, 0, y - TREAD / 2, z)
      if (fermé) {
        b.box(w, rise - TREAD, RISER, 0, y - TREAD - (rise - TREAD) / 2, z - g / 2 + RISER / 2)
      }
    }

    // Limons : une pièce filante de chaque côté, inclinée sur la pente
    const angle = Math.atan2(ht, run)
    const length = Math.hypot(run, ht)
    for (const side of [-1, 1]) {
      const limon = b.box(
        0.05,
        STRINGER,
        length,
        side * (w / 2 + 0.025),
        ht / 2 - STRINGER * 0.35,
        0,
      )
      limon.rotation.x = angle
    }

    return b.center()
  },

  // TARIFS PROVISOIRES — à caler avec le client
  price(config) {
    const n = num(config, 'marches')
    const largeurFacteur = num(config, 'largeur') / 90
    const contremarches = bool(config, 'contremarches') ? n * 75 : 0
    return (n * 340 + contremarches) * largeurFacteur + 620
  },
}
