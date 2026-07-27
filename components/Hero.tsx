import { revealed, revealedGlow } from '@/lib/reveal'

export default function Hero() {
  return (
    <section
      id="hero"
      // La hauteur est plafonnée : en `88vh` seul, un écran haut (tablette en
      // portrait) étirait le hero bien au-delà de son contenu. Et le contenu
      // n'est collé en bas qu'à partir de lg, où ce cadrage est voulu — en
      // dessous il se centre, sinon tout le vide s'accumule au-dessus de lui.
      className="relative min-h-[min(70vh,620px)] lg:min-h-[min(88vh,880px)] flex items-center lg:items-end bg-charcoal overflow-hidden px-6 md:px-12 pt-24 lg:pt-0 pb-16 md:pb-20"
    >
      {/* Fond dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#2E2A24] to-charcoal" />

      {/* Grille subtile */}
      <div className="absolute inset-0 hero-pattern opacity-100" />

      {/* Accent doré */}
      <div
        {...revealedGlow()}
        className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-bl from-brand/10 to-transparent"
      />

      {/* Contenu */}
      <div className="relative z-10 max-w-2xl">
        <div
          {...revealed(0)}
          className="inline-block bg-brand/15 border border-brand/30 text-brand text-xs font-medium tracking-[0.12em] uppercase px-4 py-1.5 rounded-sm mb-6"
        >
          ✦ Artisan Menuisier — Depuis 2023
        </div>

        <h1
          {...revealed(1, 'up', { fontSize: 'clamp(2.2rem, 7vw, 5.5rem)' })}
          className="font-playfair text-white font-normal leading-[1.05] mb-6"
        >
          L&apos;art du bois,<br />
          <em className="text-brand not-italic italic">façonné pour vous</em>
        </h1>

        <p {...revealed(2)} className="text-white/55 text-base font-light leading-relaxed max-w-md mb-10">
          Chaque pièce est unique. Nous créons des meubles sur mesure qui s&apos;adaptent
          parfaitement à votre espace et à votre style de vie.
        </p>

        <div {...revealed(3)} className="flex flex-col sm:flex-row gap-3">
          <a
            href="#configurateur"
            className="bg-brand text-white text-sm font-medium px-8 py-3.5 rounded-sm hover:bg-brand-dark transition-colors text-center"
          >
            Configurer mon meuble
          </a>
          <a
            href="#realisations"
            className="border border-white/25 text-white/70 text-sm px-8 py-3.5 rounded-sm hover:border-brand hover:text-brand transition-colors text-center"
          >
            Voir les réalisations
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div
        {...revealed(6)}
        className="hidden md:flex absolute bottom-8 right-12 flex-col items-center gap-2 text-white/30 text-[0.65rem] tracking-[0.12em] uppercase animate-bounce-slow"
      >
        Défiler
        <span className="block w-px h-10 bg-gradient-to-b from-brand/50 to-transparent" />
      </div> */}
    </section>
  )
}
