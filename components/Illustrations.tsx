import type { ReactNode } from 'react'

/**
 * Illustrations d'exemple des réalisations.
 *
 * Dessins au trait volontairement, pas des photographies : la section présente
 * le travail de l'atelier, et des photos de stock y feraient passer le mobilier
 * d'un autre pour le sien. Elles tiennent la place jusqu'aux vraies prises de
 * vue — les remplacer ne touchera que ce fichier et Gallery.tsx.
 *
 * Même langage graphique que les schémas du configurateur : trait fin, aplats
 * légers, couleur héritée du conteneur.
 */

function Scene({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 250"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const soft = { fill: 'currentColor', fillOpacity: 0.14 }

/** Dressing panoramique — penderie, étagères, tiroirs. */
function Dressing() {
  return (
    <Scene>
      <rect x="20" y="38" width="160" height="176" />
      <rect x="27" y="45" width="146" height="162" />
      <line x1="76" y1="45" x2="76" y2="207" />
      <line x1="124" y1="45" x2="124" y2="207" />
      {/* penderie */}
      <line x1="27" y1="72" x2="76" y2="72" />
      {[38, 50, 62].map((x) => (
        <path key={x} d={`M${x} 72 L${x} 80 M${x - 5} 92 L${x} 80 L${x + 5} 92`} />
      ))}
      {/* étagères */}
      <line x1="76" y1="82" x2="124" y2="82" />
      <line x1="76" y1="124" x2="124" y2="124" />
      <line x1="76" y1="166" x2="124" y2="166" />
      <rect x="84" y="90" width="14" height="26" {...soft} />
      <rect x="102" y="132" width="16" height="26" {...soft} />
      {/* tiroirs */}
      <rect x="132" y="60" width="33" height="30" {...soft} />
      <rect x="132" y="98" width="33" height="30" {...soft} />
      <rect x="132" y="136" width="33" height="30" {...soft} />
      <line x1="143" y1="75" x2="154" y2="75" />
      <line x1="143" y1="113" x2="154" y2="113" />
      <line x1="143" y1="151" x2="154" y2="151" />
      <line x1="10" y1="214" x2="190" y2="214" />
    </Scene>
  )
}

/** Cuisine contemporaine — hauts, hotte, plan de travail, bas. */
function Cuisine() {
  return (
    <Scene>
      <rect x="24" y="44" width="82" height="52" />
      <line x1="65" y1="44" x2="65" y2="96" />
      <line x1="56" y1="88" x2="60" y2="88" />
      <line x1="70" y1="88" x2="74" y2="88" />
      {/* hotte */}
      <path d="M124 44 L172 44 L162 84 L134 84 Z" {...soft} />
      <line x1="134" y1="84" x2="162" y2="84" />
      {/* plan de travail */}
      <rect x="18" y="136" width="164" height="7" {...soft} />
      {/* évier et robinet */}
      <rect x="36" y="120" width="46" height="16" />
      <path d="M100 136 L100 112 Q100 106 108 106 L116 106" />
      <line x1="116" y1="106" x2="116" y2="114" />
      {/* meubles bas */}
      <rect x="24" y="143" width="152" height="62" />
      <line x1="75" y1="143" x2="75" y2="205" />
      <line x1="126" y1="143" x2="126" y2="205" />
      <line x1="42" y1="196" x2="57" y2="196" />
      <line x1="93" y1="196" x2="108" y2="196" />
      <line x1="144" y1="196" x2="159" y2="196" />
      <line x1="14" y1="205" x2="186" y2="205" />
    </Scene>
  )
}

/** Bibliothèque — travées d'étagères et livres. */
function Bibliotheque() {
  return (
    <Scene>
      <rect x="32" y="32" width="136" height="182" />
      <rect x="39" y="39" width="122" height="168" />
      <line x1="39" y1="79" x2="161" y2="79" />
      <line x1="39" y1="121" x2="161" y2="121" />
      <line x1="39" y1="163" x2="161" y2="163" />
      {/* rangées de livres : hauteurs inégales, un volume couché en appui */}
      <rect x="46" y="52" width="7" height="27" {...soft} />
      <rect x="55" y="46" width="8" height="33" {...soft} />
      <rect x="65" y="55" width="6" height="24" {...soft} />
      <rect x="73" y="50" width="8" height="29" {...soft} />
      <rect x="83" y="45" width="7" height="34" {...soft} />
      <path d="M92 79 L97 45 L104 47 L99 79 Z" {...soft} />
      <rect x="110" y="52" width="8" height="27" {...soft} />
      <rect x="121" y="46" width="7" height="33" {...soft} />
      <rect x="46" y="94" width="7" height="27" {...soft} />
      <rect x="56" y="88" width="8" height="33" {...soft} />
      <rect x="67" y="97" width="7" height="24" {...soft} />
      <rect x="120" y="90" width="9" height="31" {...soft} />
      <rect x="132" y="96" width="7" height="25" {...soft} />
      <rect x="46" y="134" width="8" height="29" {...soft} />
      <rect x="57" y="140" width="7" height="23" {...soft} />
      <path d="M100 163 L105 131 L112 133 L107 163 Z" {...soft} />
      <rect x="128" y="136" width="8" height="27" {...soft} />
      <line x1="18" y1="214" x2="182" y2="214" />
    </Scene>
  )
}

/** Salle de bain — miroir, vasque, meuble suspendu. */
function SalleDeBain() {
  return (
    <Scene>
      <rect x="62" y="34" width="76" height="66" rx="3" {...soft} />
      <line x1="62" y1="46" x2="138" y2="46" />
      {/* robinet */}
      <path d="M100 132 L100 110 Q100 104 108 104 L114 104" />
      <line x1="114" y1="104" x2="114" y2="112" />
      {/* vasque */}
      <path d="M66 128 L134 128 L127 148 Q100 156 73 148 Z" {...soft} />
      <line x1="66" y1="128" x2="134" y2="128" />
      {/* meuble suspendu */}
      <rect x="48" y="156" width="104" height="46" />
      <line x1="100" y1="156" x2="100" y2="202" />
      <line x1="70" y1="192" x2="86" y2="192" />
      <line x1="114" y1="192" x2="130" y2="192" />
      <line x1="24" y1="214" x2="176" y2="214" strokeDasharray="4 5" strokeOpacity={0.6} />
    </Scene>
  )
}

/** Meuble TV intégré — écran, niches, tiroirs. */
function MeubleTv() {
  return (
    <Scene>
      <rect x="44" y="44" width="112" height="70" rx="2" {...soft} />
      <line x1="100" y1="114" x2="100" y2="126" />
      <line x1="86" y1="126" x2="114" y2="126" />
      <rect x="26" y="146" width="148" height="52" />
      <rect x="32" y="152" width="136" height="40" />
      <line x1="77" y1="152" x2="77" y2="192" />
      <line x1="123" y1="152" x2="123" y2="192" />
      <line x1="32" y1="172" x2="77" y2="172" />
      <line x1="123" y1="172" x2="168" y2="172" />
      <rect x="84" y="157" width="32" height="15" {...soft} />
      <rect x="84" y="176" width="32" height="15" {...soft} />
      <rect x="40" y="156" width="9" height="14" {...soft} />
      <rect x="52" y="158" width="9" height="12" {...soft} />
      <line x1="40" y1="198" x2="40" y2="210" />
      <line x1="160" y1="198" x2="160" y2="210" />
      <line x1="18" y1="210" x2="182" y2="210" />
    </Scene>
  )
}

/** Bureau architecte — plateau, caisson, lampe, rouleau de plans. */
function Bureau() {
  return (
    <Scene>
      <rect x="22" y="124" width="156" height="8" {...soft} />
      {/* caisson à tiroirs */}
      <rect x="34" y="132" width="52" height="72" />
      <line x1="34" y1="156" x2="86" y2="156" />
      <line x1="34" y1="180" x2="86" y2="180" />
      <line x1="53" y1="144" x2="67" y2="144" />
      <line x1="53" y1="168" x2="67" y2="168" />
      <line x1="53" y1="192" x2="67" y2="192" />
      {/* piètement */}
      <line x1="158" y1="132" x2="158" y2="204" />
      <line x1="166" y1="132" x2="166" y2="204" />
      <line x1="158" y1="204" x2="166" y2="204" />
      {/* lampe d'architecte */}
      <path d="M132 124 L132 100 L108 74" />
      <path d="M108 74 L94 62 L82 74 L96 86 Z" {...soft} />
      <circle cx="132" cy="100" r="3" />
      <line x1="124" y1="124" x2="140" y2="124" />
      {/* rouleau de plans et équerre */}
      <rect x="96" y="114" width="46" height="10" rx="5" {...soft} />
      <path d="M46 124 L46 112 L72 124 Z" {...soft} />
      <line x1="14" y1="204" x2="186" y2="204" />
    </Scene>
  )
}

/** Indexé par l'identifiant des entrées de GALLERY_ITEMS. */
export const ILLUSTRATIONS: Record<number, () => JSX.Element> = {
  1: Dressing,
  2: Cuisine,
  3: Bibliotheque,
  4: SalleDeBain,
  5: MeubleTv,
  6: Bureau,
}
