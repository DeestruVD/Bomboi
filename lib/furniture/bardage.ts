import type { FurnitureType } from '@/types'
import { Builder, INSULATION, T, cm, num, m2 } from './helpers'

const LATH_T = 0.02 // épaisseur d'une latte

/**
 * Bardage + isolation — le seul « meuble » qui n'est pas un volume mais une
 * paroi. On construit les couches dans l'ordre : mur support, isolant entre
 * montants, parement à lattes. Le parement s'arrête avant le bord droit pour
 * laisser voir la composition en tranche, comme sur le schéma.
 */
export const bardage: FurnitureType = {
  key: 'bardage',
  label: 'Bardage + isolation',
  tagline: 'Parement à lattes sur ossature, isolant apparent en tranche.',
  options: ['optLumiere'],
  // Les montants d'ossature dépassent de part et d'autre du pan.
  maxDims: { w: 6.05, h: 3.5, d: 0.25 },
  params: [
    { kind: 'number', key: 'largeur', label: 'Largeur du pan', min: 100, max: 600, step: 10, def: 300 },
    { kind: 'number', key: 'hauteur', label: 'Hauteur', min: 100, max: 350, step: 10, def: 250 },
    { kind: 'number', key: 'latte', label: 'Largeur de latte', min: 6, max: 20, step: 1, def: 12 },
    { kind: 'number', key: 'jeu', label: 'Jeu entre lattes', min: 0, max: 3, step: 0.5, def: 1 },
    { kind: 'number', key: 'isolant', label: "Épaisseur d'isolant", min: 0, max: 20, step: 1, def: 10 },
  ],

  build(config, color) {
    const b = new Builder(color)
    const w = cm(num(config, 'largeur'))
    const h = cm(num(config, 'hauteur'))
    const lw = cm(num(config, 'latte'))
    const gap = cm(num(config, 'jeu'))
    const ins = cm(num(config, 'isolant'))

    const wall = b.material(0xdedad2, { rough: 0.95, metal: 0 })
    const insulation = b.material(INSULATION, { rough: 1, metal: 0 })

    // Mur support
    b.box(w, h, T, 0, h / 2, 0, wall)

    // Isolant entre montants
    const zIns = T / 2 + ins / 2
    if (ins > 0) b.box(w, h, ins, 0, h / 2, zIns, insulation)

    // Montants d'ossature, noyés dans l'isolant
    const montantPitch = 0.6
    const montants = Math.max(2, Math.round(w / montantPitch))
    for (let i = 0; i <= montants; i++) {
      const x = -w / 2 + (w / montants) * i
      b.box(0.04, h, Math.max(ins, T), x, h / 2, zIns)
    }

    // Parement : lattes verticales, arrêtées avant le bord droit
    const zLath = T / 2 + ins + LATH_T / 2
    const cut = Math.min(0.4, w * 0.14)
    const covered = w - cut
    const pitch = lw + gap
    const count = Math.max(1, Math.floor(covered / pitch))
    for (let i = 0; i < count; i++) {
      b.box(lw, h, LATH_T, -w / 2 + pitch * i + lw / 2, h / 2, zLath)
    }

    return b.center()
  },

  // TARIFS PROVISOIRES — à caler avec le client
  price(config) {
    const surface = m2(num(config, 'largeur'), num(config, 'hauteur'))
    const poseIsolant = (num(config, 'isolant') / 10) * 45
    return surface * (110 + poseIsolant)
  },
}
