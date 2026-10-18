import { Email, GitHub, LinkedIn, Memory, Update } from '@mui/icons-material';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0B0F19] text-gray-400 overflow-hidden border-t border-gray-900">
      {/* Halos lumineux d'arrière-plan très subtils */}
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -top-24 right-10 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative py-16 px-4 max-w-6xl mx-auto">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* 📡 Colonne 1 : Identité Système */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <span className="text-white font-mono font-bold text-lg">MK</span>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-wide font-mono">
                Mamadou Konaté
              </h3>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">
              Architecte Fullstack & DevSecOps. Modélisation de solutions logicielles sécurisées,
              évolutives et axées sur l'impact utilisateur.
            </p>
            <div className="flex items-center gap-3 bg-gray-950/40 border border-gray-900/60 px-4 py-2 rounded-xl w-fit">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              <span className="text-xs font-mono text-gray-400 tracking-wide">
                SYSTEM::STATUS_AVAILABLE_FOR_JOBS
              </span>
            </div>
          </div>

          {/* 🔌 Colonne 2 : Liens & Connecteurs */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">
                // CHANNELS_CONNECT
              </h4>

              <div className="mb-6">
                <a
                  href="mailto:kmma.960@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center group-hover:border-blue-500/30 transition-all">
                    <Email fontSize="small" className="text-gray-500 group-hover:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-600 uppercase">Endpoint</p>
                    <p className="text-sm font-medium text-gray-300">kmma.960@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Réseaux sociaux style boutons de console */}
            <div className="flex gap-4">
              {[
                {
                  icon: <GitHub fontSize="small" />,
                  url: 'https://github.com/geek-konate',
                  color: 'hover:border-white hover:text-white',
                  label: 'GitHub',
                },
                {
                  icon: <LinkedIn fontSize="small" />,
                  url: 'https://www.linkedin.com/in/konat%C3%A9-mamadou-518b43376',
                  color: 'hover:border-blue-500 hover:text-blue-400',
                  label: 'LinkedIn',
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 bg-gray-950/60 border border-gray-800 rounded-xl flex items-center justify-center text-gray-500 transition-all duration-300 transform hover:-translate-y-0.5 ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 💻 Section Inférieure : Logs de compilation & Copyright */}
        <div className="border-t border-gray-900 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright discret style badge système */}
          <div className="flex items-center gap-3 font-mono text-xs text-gray-600">
            <span className="px-2.5 py-1 bg-gray-950 border border-gray-900 rounded-md text-gray-400">
              © {currentYear}
            </span>
            <span>Mamadou Konaté. [ALL_RIGHTS_RESERVED]</span>
          </div>

          {/* Déclaration du Kernel technique */}
          <div className="flex flex-col items-center md:items-end gap-1.5 font-mono text-[11px] text-gray-600">
            <div className="flex items-center gap-1.5">
              <Memory className="text-gray-700" fontSize="inherit" />
              <span>STACK_COMPILED_WITH: </span>
              <span className="text-blue-400">React.js</span>
              <span>•</span>
              <span className="text-purple-400">FastAPI</span>
              <span>•</span>
              <span className="text-blue-500">Tailwind</span>
            </div>

            <div className="flex items-center gap-1.5 text-gray-700 text-[10px]">
              <Update fontSize="inherit" />
              <span>SYS_UPTIME_REFRESHED: {new Date().toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
