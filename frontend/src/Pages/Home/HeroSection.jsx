import '@fontsource/roboto';
import { ArrowRight, Code, Computer, Shield } from '@mui/icons-material';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#0B0F19] text-gray-100">
      {/* 🌌 Arrière-plan Cyber & Grille Tech */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Halos lumineux dynamiques (Glow effect) */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 📝 CÔTÉ GAUCHE : Textes & Actions (Prend 7 colonnes sur desktop) */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            {/* Badge Tech Futuriste */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <Shield className="text-blue-400 animate-pulse" fontSize="small" />
              <span className="text-xs md:text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ingénieur Full-Stack & DevSecOps
              </span>
            </div>

            {/* Titre Principal Épuré */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-none">
              <span className="block text-gray-400 font-light text-xl sm:text-2xl md:text-3xl mb-2">
                Bonjour, je suis
              </span>
              <span className="relative block">
                Mamadou Konaté
                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 hidden lg:block rounded-full"></span>
              </span>
            </h1>

            {/* Description Technique & Impactante */}
            <p className="text-gray-400 mb-8 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl lg:mx-0 mx-auto">
              Je conçois des architectures web robustes et performantes. Mon focus ? Fusionner le
              développement applicatif moderne et la rigueur du{' '}
              <span className="text-blue-400 font-medium">DevSecOps</span> pour garantir des
              déploiements hautement sécurisés et automatisés.
            </p>

            {/* Boutons d'Action (Style Minimaliste & Éclairé) */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href="#portfolio"
                className="relative group overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-sm md:text-base shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explorer mes projets{' '}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="#contact"
                className="px-6 py-3 border border-gray-700 hover:border-gray-500 bg-gray-900/40 backdrop-blur-md text-gray-300 hover:text-white rounded-xl font-medium text-sm md:text-base transition-colors duration-300"
              >
                Discutons ensemble
              </a>
            </div>
          </div>

          {/* 🖼️ CÔTÉ DROIT : Cadre Photo Futuriste (Prend 5 colonnes sur desktop) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative group">
              {/* Effet néon arrière-plan */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>

              {/* Conteneur principal de la photo (Asymétrique et technologique) */}
              <div className="relative z-10 border border-gray-800 bg-gray-900/60 backdrop-blur-xl rounded-3xl p-3 shadow-2xl w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 transform hover:scale-[1.02] transition-transform duration-500">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent z-10 opacity-40"></div>
                  <img
                    src="/img/20250807_171450.jpg"
                    alt="Mamadou Konaté"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://via.placeholder.com/400x400/0F172A/FFFFFF?text=Mamadou.K';
                    }}
                  />
                </div>

                {/* Badge Flottant Tech : Architecture */}
                <div className="absolute -top-4 -left-4 bg-gray-900/80 border border-gray-800 backdrop-blur-md text-blue-400 p-2.5 rounded-xl shadow-lg hidden sm:block">
                  <Computer fontSize="small" />
                </div>

                {/* Badge Expérience Flottant en Bas de la Photo */}
                <div className="absolute -bottom-6 right-6 bg-gray-900/90 border border-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                    <Code className="text-blue-400" fontSize="small" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white leading-none">2+ Ans</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-1">
                      D'ingénierie
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de défilement discret */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-40 hover:opacity-100 transition-opacity">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
