/**
 * Le lettrage de la marque, reconstruit en texte plutôt qu'en image.
 *
 * Le logo est purement typographique : le composer en HTML le garde net à
 * toutes les tailles, sans requête réseau supplémentaire, et il hérite
 * automatiquement de la couleur du bloc qui l'accueille.
 *
 * Pour repasser au fichier d'origine le jour où il est fourni : déposer
 * l'image dans public/ et remplacer le corps de ce composant par un
 * next/image — le reste du site n'a pas à bouger.
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-end leading-[0.95] select-none ${className}`}
      role="img"
      aria-label="L’atelier Bomboi — Menuiserie"
    >
      <span
        className="font-sans font-bold tracking-[-0.02em]"
        style={{ fontSize: 'clamp(1.5rem, 2.6vw, 3rem)' }}
      >
        L&rsquo;atelier
      </span>

      <span
        className="font-sans font-normal uppercase opacity-70 my-[0.35em]"
        style={{ fontSize: 'clamp(0.5rem, 0.75vw, 0.72rem)', letterSpacing: '0.5em' }}
      >
        {/* La lettre-espacement pousse un blanc après le « e » : on le compense
            pour que la ligne reste alignée à droite avec les deux autres. */}
        <span className="-mr-[0.5em] inline-block">Menuiserie</span>
      </span>

      <span
        className="font-sans font-bold tracking-[-0.02em]"
        style={{ fontSize: 'clamp(2rem, 3.6vw, 4rem)' }}
      >
        Bomboi.
      </span>
    </div>
  )
}
