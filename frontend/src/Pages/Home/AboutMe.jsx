import { PhoneAndroid, Rocket, Shield, Storage, Terminal } from '@mui/icons-material';
import Headling from '../../composents/Headling/Headling';

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative w-full py-20 md:py-28 bg-[#0B0F19] text-gray-300 overflow-hidden border-t border-gray-900"
    >
      {/* Effet de fondu en arrière-plan */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête de section centré */}
        <div className="text-center mb-16 md:mb-24">
          <Headling hightlight="À Propos" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Découvrez le profil technique et la philosophie d'ingénierie derrière les solutions
            développées.
          </p>
        </div>

        {/* Grille principale asymétrique */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* 🪪 BLOC GAUCHE : La "Badge Card" de l'Ingénieur (Prend 5 colonnes) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="relative group border border-gray-800 bg-gray-900/40 backdrop-blur-md rounded-3xl p-4 shadow-2xl">
              {/* Ligne lumineuse décorative style terminal */}
              <div className="flex items-center gap-1.5 border-b border-gray-800/80 pb-3 mb-4 text-gray-500 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
                <span className="ml-2">profile_manifest.yaml</span>
              </div>

              {/* Photo avec overlay technique */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent z-10 opacity-60"></div>
                <img
                  src="/img/20250505_153458.jpg"
                  alt="Mamadou Konaté - Développeur Full-Stack"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Infos rapides sous la photo */}
              <div className="mt-4 pt-2 flex justify-between items-center font-mono text-xs text-gray-400">
                <span>ROLE: ENGINEER_FS</span>
                <span className="text-blue-400 animate-pulse">STATUS: ONLINE</span>
              </div>
            </div>

            {/* GitHub Call-to-Action style épuré */}
            <a
              href="https://github.com/geek-Konate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3.5 border border-gray-800 hover:border-gray-600 bg-gray-900/20 hover:bg-gray-900/60 rounded-xl font-medium tracking-wide text-sm text-gray-300 hover:text-white transition-all duration-300 shadow-sm"
            >
              <Terminal fontSize="small" className="text-purple-400" />
              Parcourir mon code source (GitHub)
            </a>
          </div>

          {/* 💻 BLOC DROIT : Dashboard de Compétences & Présentation (Prend 7 colonnes) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Texte de présentation principal */}
            <div className="space-y-4 text-gray-400 text-base md:text-lg leading-relaxed">
              <p>
                Passionné par la création d'applications complexes, je structure mon approche autour
                de deux piliers fondamentaux :{' '}
                <span className="text-white font-semibold">l'efficience applicative</span> et la{' '}
                <span className="text-blue-400 font-semibold">sécurité infrastructurelle</span>.
              </p>
              <p>
                Mon expertise me permet de couvrir l'intégralité du cycle de vie d'un projet, de la
                modélisation de bases de données relationnelles jusqu'à l'automatisation des
                déploiements. J'applique systématiquement les patterns DevSecOps pour prémunir les
                architectures des vulnérabilités courantes.
              </p>
            </div>

            {/* Grille technique intégrée (Forme compacte) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-gray-900 py-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
                  <PhoneAndroid fontSize="small" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Frontend</div>
                  <div className="text-xs text-gray-500">React & Flutter</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg">
                  <Terminal fontSize="small" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Backend</div>
                  <div className="text-xs text-gray-500">Python & FastAPI</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">
                  <Storage fontSize="small" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Data & DevOps</div>
                  <div className="text-xs text-gray-500">SQL & Ansible</div>
                </div>
              </div>
            </div>

            {/* Philosophie d'Ingénierie sous forme de carte Glass */}
            <div className="relative overflow-hidden border border-gray-800/80 bg-gradient-to-r from-gray-900/40 to-transparent p-6 rounded-2xl">
              <div className="absolute top-0 right-0 p-3 text-gray-800 pointer-events-none">
                <Shield fontSize="large" />
              </div>
              <div className="flex items-start gap-4">
                <Rocket className="text-blue-400 mt-1" />
                <div>
                  <h3 className="font-bold text-white text-base md:text-lg mb-1.5">
                    Philosophie d'ingénierie
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    "Un logiciel n'est pas terminé lorsqu'il fonctionne, mais lorsqu'il est
                    parfaitement résilient, monitoré et sécurisé. Chaque décision technique doit
                    pérenniser la structure globale."
                  </p>
                </div>
              </div>
            </div>

            {/* Statistiques (Design Minimaliste sous forme de compteurs) */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="border border-gray-900 bg-gray-900/10 p-4 rounded-xl text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-blue-400">2+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 font-semibold mt-1">
                  Années d'XP
                </div>
              </div>
              <div className="border border-gray-900 bg-gray-900/10 p-4 rounded-xl text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-purple-400">10+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 font-semibold mt-1">
                  Projets Livrés
                </div>
              </div>
              <div className="border border-gray-900 bg-gray-900/10 p-4 rounded-xl text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-green-400">100%</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 font-semibold mt-1">
                  Disponibilité
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
