import * as THREE from 'three'
import type { FurnitureConfig, ParamDef } from '@/types'

/** Épaisseur standard d'un panneau, en mètres (2 cm). */
export const T = 0.02

/** Passage des cotes saisies (cm) aux unités de la scène (m). */
export const cm = (v: number) => v / 100

/**
 * Petit constructeur de scène : accumule des boîtes dans un groupe, avec un
 * matériau principal (le bois choisi) et la possibilité d'en glisser un autre
 * pour les éléments qui ne sont pas en bois (verre, isolant, quincaillerie).
 */
export class Builder {
  readonly group = new THREE.Group()
  readonly wood: THREE.MeshStandardMaterial
  /** Parent courant des pièces ajoutées — le groupe racine, ou un pivot. */
  private target: THREE.Object3D

  constructor(color: number) {
    this.target = this.group
    this.wood = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.6,
      metalness: 0.05,
    })
  }

  /** Un panneau parallélépipédique. Position = centre de la boîte. */
  box(
    sx: number,
    sy: number,
    sz: number,
    px: number,
    py: number,
    pz: number,
    material?: THREE.Material,
  ): THREE.Mesh {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(Math.max(sx, 0.001), Math.max(sy, 0.001), Math.max(sz, 0.001)),
      material ?? this.wood,
    )
    mesh.position.set(px, py, pz)
    this.target.add(mesh)
    return mesh
  }

  /**
   * Un axe de rotation : les pièces construites dans le callback sont exprimées
   * par rapport à ce point et tournent avec lui. Sert aux ouvrants (une porte
   * pivote autour de ses charnières, pas autour de son milieu).
   */
  pivot(px: number, py: number, pz: number, rotY: number, fn: () => void) {
    const g = new THREE.Group()
    g.position.set(px, py, pz)
    g.rotation.y = rotY
    this.group.add(g)

    const previous = this.target
    this.target = g
    fn()
    this.target = previous
    return g
  }

  /**
   * Un profil 2D (plan XY) extrudé en profondeur : sert aux pièces qui ne sont
   * pas des boîtes — le fond d'un meuble sous pente, le limon d'un escalier.
   */
  shape(
    points: [number, number][],
    depth: number,
    pz: number,
    material?: THREE.Material,
  ): THREE.Mesh {
    const s = new THREE.Shape()
    points.forEach(([x, y], i) => (i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)))
    s.closePath()
    const mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false }),
      material ?? this.wood,
    )
    mesh.position.z = pz
    this.target.add(mesh)
    return mesh
  }

  /** Un matériau secondaire (verre, isolant, métal). */
  material(color: number, opts: { rough?: number; metal?: number; opacity?: number } = {}) {
    return new THREE.MeshStandardMaterial({
      color,
      roughness: opts.rough ?? 0.5,
      metalness: opts.metal ?? 0.1,
      transparent: opts.opacity !== undefined,
      opacity: opts.opacity ?? 1,
    })
  }

  /**
   * Recentre les meshes sur le barycentre de la boîte englobante. Les modules
   * construisent donc dans un repère « sol à y = 0 », plus naturel à écrire, et
   * la rotation à la souris s'applique quand même autour du centre du meuble.
   */
  center(): THREE.Group {
    const box = new THREE.Box3().setFromObject(this.group)
    const c = box.getCenter(new THREE.Vector3())
    this.group.children.forEach((child) => child.position.sub(c))
    return this.group
  }
}

/** Couleurs des matériaux qui ne suivent pas l'essence choisie. */
export const GLASS = 0xbcc4c4
export const METAL = 0x8d8d8d
export const INSULATION = 0xd8c9a3

export const num = (config: FurnitureConfig, key: string) => Number(config[key])
export const str = (config: FurnitureConfig, key: string) => String(config[key])
export const bool = (config: FurnitureConfig, key: string) => Boolean(config[key])

/** Surface d'une face en m², à partir de deux cotes en cm. */
export const m2 = (a: number, b: number) => (a * b) / 10000

/** Configuration de départ d'un type : valeurs par défaut des paramètres, options décochées. */
export function defaultsFor(params: ParamDef[], options: string[]): FurnitureConfig {
  const config: FurnitureConfig = {}
  params.forEach((p) => (config[p.key] = p.def))
  options.forEach((o) => (config[o] = false))
  return config
}
