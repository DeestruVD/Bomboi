import type { FurnitureConfig, FurnitureKey, MaterialKey, PriceBreakdown } from '@/types'
import { MATERIALS, OPTIONS } from './constants'
import { FURNITURE } from './furniture'

/**
 * La ventilation affichée est la même pour les neuf meubles — structure,
 * matériau, options. Seule la base est propre au type et vient de son module.
 */
export function calcPrix(
  type: FurnitureKey,
  config: FurnitureConfig,
  materiau: MaterialKey,
): PriceBreakdown {
  const base = FURNITURE[type].price(config)

  const pStructure = Math.round(base * 0.6)
  const pMateriau = Math.round(base * 0.4 * MATERIALS[materiau].mult)

  const applicables = FURNITURE[type].options
  const pOptions = OPTIONS.filter((o) => applicables.includes(o.key) && config[o.key]).reduce(
    (sum, o) => sum + o.price,
    0,
  )

  return { pStructure, pMateriau, pOptions, total: pStructure + pMateriau + pOptions }
}

export function formatPrice(value: number): string {
  return value.toLocaleString('fr-BE') + ' €'
}
