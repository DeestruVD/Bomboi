import type { ReactNode } from 'react'
import type { FurnitureKey } from '@/types'

/**
 * Les schémas au trait des vignettes de présélection.
 *
 * Registre volontairement distinct de la 3D : ces dessins annoncent la structure
 * du meuble (découpage, refends, ouvrants), la prévisualisation la construit en
 * volume. Ce sont deux façons de dire la même chose.
 *
 * Convention de dessin : traits pleins pour ce qui est visible, pointillés pour
 * ce qui est masqué par une autre pièce, aplat léger pour les parties pleines
 * (façades, plateaux, vantaux).
 */

function Trace({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      {children}
    </svg>
  )
}

/** Aplat léger : une face pleine. */
const solid = { fill: 'currentColor', fillOpacity: 0.12 }
/** Ce que l'on ne voit pas depuis ce point de vue. */
const hidden = { strokeDasharray: '3 3', strokeOpacity: 0.55 }

function Placard() {
  return (
    <Trace>
      <rect x="14" y="10" width="92" height="100" />
      <rect x="19" y="15" width="82" height="90" />
      <line x1="49" y1="15" x2="49" y2="105" />
      <line x1="76" y1="15" x2="76" y2="105" />
      {/* penderie */}
      <line x1="19" y1="33" x2="49" y2="33" />
      <line x1="34" y1="33" x2="34" y2="38" />
      <line x1="30" y1="38" x2="38" y2="38" />
      {/* étagères */}
      <line x1="49" y1="38" x2="76" y2="38" />
      <line x1="49" y1="60" x2="76" y2="60" />
      <line x1="49" y1="82" x2="76" y2="82" />
      <line x1="76" y1="52" x2="101" y2="52" />
      <rect x="79" y="58" width="19" height="12" {...solid} />
      <rect x="79" y="74" width="19" height="12" {...solid} />
    </Trace>
  )
}

function SousPente() {
  return (
    <Trace>
      <polygon points="14,110 14,54 106,14 106,110" />
      <polygon points="19,105 19,58 101,22 101,105" />
      <line x1="47" y1="105" x2="47" y2="46" />
      <line x1="75" y1="105" x2="75" y2="33" />
      <line x1="19" y1="80" x2="47" y2="80" />
      <line x1="47" y1="70" x2="75" y2="70" />
      <line x1="47" y1="52" x2="75" y2="52" />
      <line x1="75" y1="66" x2="101" y2="66" />
      <line x1="75" y1="44" x2="101" y2="44" />
      {/* ligne du rampant */}
      <line x1="14" y1="54" x2="106" y2="14" {...hidden} />
    </Trace>
  )
}

function MeubleTv() {
  return (
    <Trace>
      {/* la télé donne l'échelle, elle n'est pas fabriquée */}
      <rect x="34" y="14" width="52" height="32" {...hidden} />
      <line x1="60" y1="46" x2="60" y2="54" {...hidden} />
      <rect x="8" y="54" width="104" height="44" />
      <rect x="12" y="58" width="96" height="36" />
      <line x1="44" y1="58" x2="44" y2="94" />
      <line x1="76" y1="58" x2="76" y2="94" />
      <line x1="12" y1="76" x2="44" y2="76" />
      <rect x="48" y="62" width="24" height="12" {...solid} />
      <rect x="48" y="78" width="24" height="12" {...solid} />
      <line x1="76" y1="76" x2="108" y2="76" />
      <line x1="18" y1="98" x2="18" y2="106" />
      <line x1="102" y1="98" x2="102" y2="106" />
    </Trace>
  )
}

function Bardage() {
  return (
    <Trace>
      {/* parement à lattes */}
      <rect x="10" y="14" width="70" height="92" />
      {[20, 30, 40, 50, 60, 70].map((x) => (
        <line key={x} x1={x} y1="14" x2={x} y2="106" />
      ))}
      {/* coupe : isolant puis mur support */}
      <polygon points="80,14 110,14 110,106 80,106" />
      <line x1="88" y1="14" x2="88" y2="106" />
      <rect x="88" y="14" width="12" height="92" {...solid} />
      <line x1="100" y1="14" x2="100" y2="106" />
      {[22, 38, 54, 70, 86, 102].map((y) => (
        <line key={y} x1="80" y1={y} x2="88" y2={y - 8} strokeWidth={0.9} strokeOpacity={0.7} />
      ))}
    </Trace>
  )
}

function Table() {
  return (
    <Trace>
      {/* plateau vu en perspective */}
      <polygon points="10,44 96,44 110,34 24,34" {...solid} />
      <line x1="10" y1="44" x2="10" y2="52" />
      <line x1="96" y1="44" x2="96" y2="52" />
      <line x1="110" y1="34" x2="110" y2="42" />
      <line x1="10" y1="52" x2="96" y2="52" />
      <line x1="96" y1="52" x2="110" y2="42" />

      {/* pieds avant */}
      <line x1="16" y1="52" x2="16" y2="104" />
      <line x1="21" y1="52" x2="21" y2="104" />
      <line x1="16" y1="104" x2="21" y2="104" />
      <line x1="86" y1="52" x2="86" y2="104" />
      <line x1="91" y1="52" x2="91" y2="104" />
      <line x1="86" y1="104" x2="91" y2="104" />

      {/* pied arrière gauche : dessiné pour de bon, pointillé seulement là où le plateau le masque */}
      <line x1="30" y1="42" x2="30" y2="52" {...hidden} />
      <line x1="35" y1="42" x2="35" y2="52" {...hidden} />
      <line x1="30" y1="52" x2="30" y2="94" />
      <line x1="35" y1="52" x2="35" y2="94" />
      <line x1="30" y1="94" x2="35" y2="94" />

      {/* pied arrière droit, masqué par le chant du plateau sur sa partie haute */}
      <line x1="100" y1="42" x2="100" y2="48" {...hidden} />
      <line x1="105" y1="42" x2="105" y2="48" {...hidden} />
      <line x1="100" y1="48" x2="100" y2="94" />
      <line x1="105" y1="48" x2="105" y2="94" />
      <line x1="100" y1="94" x2="105" y2="94" />
    </Trace>
  )
}

function Coulissante() {
  return (
    <Trace>
      <rect x="10" y="12" width="100" height="96" />
      <line x1="10" y1="22" x2="110" y2="22" />
      <rect x="14" y="26" width="50" height="78" {...solid} />
      <rect x="56" y="26" width="50" height="78" />
      <line x1="58" y1="46" x2="58" y2="60" />
      <line x1="60" y1="46" x2="60" y2="60" />
      <line x1="18" y1="30" x2="60" y2="30" />
      <line x1="60" y1="100" x2="102" y2="100" />
      {/* débattement */}
      <path d="M70 116 L96 116" />
      <path d="M92 113 L96 116 L92 119" />
      <path d="M50 116 L24 116" />
      <path d="M28 113 L24 116 L28 119" />
    </Trace>
  )
}

function Bureau() {
  return (
    <Trace>
      <polygon points="8,50 98,50 112,40 22,40" {...solid} />
      <line x1="8" y1="50" x2="8" y2="57" />
      <line x1="98" y1="50" x2="98" y2="57" />
      <line x1="112" y1="40" x2="112" y2="47" />
      <line x1="8" y1="57" x2="98" y2="57" />
      <line x1="98" y1="57" x2="112" y2="47" />
      {/* caisson à tiroirs */}
      <rect x="14" y="57" width="34" height="44" />
      <line x1="14" y1="72" x2="48" y2="72" />
      <line x1="14" y1="87" x2="48" y2="87" />
      <line x1="27" y1="64" x2="35" y2="64" />
      <line x1="27" y1="79" x2="35" y2="79" />
      <line x1="27" y1="94" x2="35" y2="94" />
      {/* piètement */}
      <line x1="92" y1="57" x2="92" y2="101" />
      <line x1="97" y1="57" x2="97" y2="101" />
      <line x1="92" y1="101" x2="97" y2="101" />
      <line x1="106" y1="47" x2="106" y2="91" />
    </Trace>
  )
}

function Portes() {
  return (
    <Trace>
      <rect x="22" y="10" width="76" height="100" />
      <rect x="27" y="15" width="66" height="95" />
      <rect x="35" y="24" width="50" height="32" {...solid} />
      <rect x="35" y="64" width="50" height="38" {...solid} />
      <circle cx="86" cy="64" r="2.6" />
      <path d="M27 110 A 66 66 0 0 1 93 110" {...hidden} />
    </Trace>
  )
}

function Escalier() {
  return (
    <Trace>
      <polyline points="12,108 12,94 30,94 30,80 48,80 48,66 66,66 66,52 84,52 84,38 102,38 102,24 112,24" />
      <line x1="12" y1="108" x2="112" y2="108" />
      {/* limon */}
      <line x1="12" y1="108" x2="108" y2="30" />
      <line x1="112" y1="24" x2="112" y2="108" />
      {/* contremarches */}
      <line x1="30" y1="80" x2="30" y2="94" />
      <line x1="48" y1="66" x2="48" y2="80" />
      <line x1="66" y1="52" x2="66" y2="66" />
      <line x1="84" y1="38" x2="84" y2="52" />
      <line x1="102" y1="24" x2="102" y2="38" />
      <line x1="20" y1="94" x2="20" y2="108" {...hidden} />
    </Trace>
  )
}

export const SCHEMATICS: Record<FurnitureKey, () => JSX.Element> = {
  placard: Placard,
  souspente: SousPente,
  tv: MeubleTv,
  bardage: Bardage,
  table: Table,
  coulissante: Coulissante,
  bureau: Bureau,
  portes: Portes,
  escalier: Escalier,
}
