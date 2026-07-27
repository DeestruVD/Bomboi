import type { FurnitureConfig, FurnitureKey, FurnitureType } from '@/types'
import { defaultsFor } from './helpers'
import { placard } from './placard'
import { souspente } from './souspente'
import { tv } from './tv'
import { bardage } from './bardage'
import { table } from './table'
import { coulissante } from './coulissante'
import { bureau } from './bureau'
import { portes } from './portes'
import { escalier } from './escalier'

/**
 * Le registre des meubles configurables. Ajouter un type = ajouter un module à
 * côté de celui-ci et une entrée ici — rien d'autre ne bouge, hormis son schéma
 * dans components/Schematics.tsx.
 */
export const FURNITURE: Record<FurnitureKey, FurnitureType> = {
  placard,
  souspente,
  tv,
  bardage,
  table,
  coulissante,
  bureau,
  portes,
  escalier,
}

/** Ordre d'affichage dans la bande de présélection. */
export const FURNITURE_KEYS: FurnitureKey[] = [
  'placard',
  'souspente',
  'tv',
  'bardage',
  'table',
  'coulissante',
  'bureau',
  'portes',
  'escalier',
]

/** Configuration de départ de chaque type, mémorisée par le configurateur. */
export function initialConfigs(): Record<FurnitureKey, FurnitureConfig> {
  return FURNITURE_KEYS.reduce(
    (acc, key) => {
      acc[key] = defaultsFor(FURNITURE[key].params, FURNITURE[key].options)
      return acc
    },
    {} as Record<FurnitureKey, FurnitureConfig>,
  )
}
