import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { BACKEND_URL } from '../../config';

// Sub-composant pour isoler l'observation et optimiser les performances de rendu
const SkillCard = ({ skill, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // L'animation ne s'exécute qu'une seule fois au scroll
    threshold: 0.1, // Se déclenche dès que 10% de la carte est visible
  });

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (((skill.level / 5) * 100) / 100) * circumference;

  return (
    <div
      ref={ref}
      style={{
        // Optionnel : Crée un léger décalage en cascade sur les premières cartes de la grille
        transitionDelay: inView ? `${(index % 4) * 100}ms` : '0ms',
      }}
      className={`group relative bg-gradient-to-b from-gray-900/70 to-gray-900/30 backdrop-blur-md p-6 rounded-2xl border border-gray-800/80 hover:border-purple-500/40 [transform-style:preserve-3d] hover:[transform:rotateX(7deg)_rotateY(-7deg)_translateZ(10px)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(168,85,247,0.05)]

        /* Classes de transition d'apparition au scroll */
        transition-all duration-700 ease-out
        ${
          inView
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
        }
      `}
    >
      {/* Effet d'éclairage brillant (Glint) au survol */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none"></div>

      <div className="flex items-start justify-between mb-6 [transform:translateZ(20px)]">
        {/* Icône de la Tech avec conteneur néon */}
        <div className="p-3 bg-gray-950 border border-gray-800 rounded-xl w-14 h-14 flex items-center justify-center group-hover:border-purple-500/30 transition-colors duration-300 shadow-inner">
          {skill.icon_url ? (
            <img
              src={skill.icon_url}
              alt={skill.name}
              className="w-8 h-8 object-contain filter drop-shadow-[0_2px_8px_rgba(168,85,247,0.2)]"
            />
          ) : (
            <span className="text-xl text-purple-400 font-mono">&lt;/&gt;</span>
          )}
        </div>

        {/* Indicateur de niveau Circulaire */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r={radius}
              className="stroke-gray-800 fill-none"
              strokeWidth="3"
            />
            <circle
              cx="28"
              cy="28"
              r={radius}
              className="stroke-purple-500 fill-none transition-all duration-1000 ease-out group-hover:stroke-blue-400"
              strokeWidth="3"
              strokeDasharray={circumference}
              // L'anneau ne s'anime et se remplit que lorsque la carte est visible à l'écran
              strokeDashoffset={inView ? strokeDashoffset : circumference}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[11px] font-mono font-bold text-gray-400 group-hover:text-white transition-colors">
            {skill.level}/5
          </span>
        </div>
      </div>

      {/* Nom & Description avec profondeur 3D */}
      <div className="[transform:translateZ(30px)] space-y-2">
        <h3 className="font-bold text-white text-base tracking-wide group-hover:text-purple-300 transition-colors duration-300">
          {skill.name}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 group-hover:text-gray-400 transition-colors duration-300">
          {skill.description ||
            `Intégration et développement d'architectures basées sur ${skill.name}.`}
        </p>
      </div>

      {/* Petite barre de statut style interface cyber */}
      <div className="mt-4 pt-3 border-t border-gray-900 flex justify-between items-center text-[9px] font-mono text-gray-600 tracking-wider">
        <span>SYS_READY</span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 group-hover:bg-green-400 group-hover:animate-pulse"></span>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Nettoyage préventif des slashes sur l'URL
    const cleanUrl = `${BACKEND_URL.replace(/\/$/, '')}/api/skills`;

    fetch(cleanUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error('Skills is not an array:', data);
          setSkills([]);
          return;
        }
        setSkills(data);
      })
      .catch((err) => {
        console.error('Fetch skills failed:', err);
        setSkills([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = ['all', ...new Set(skills.map((s) => s.category).filter(Boolean))];

  const filteredSkills =
    selectedCategory === 'all' ? skills : skills.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="skills"
      className="relative w-full py-20 md:py-28 bg-[#0B0F19] text-gray-300 overflow-hidden border-t border-gray-900"
    >
      {/* Halos lumineux en arrière-plan */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[200px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[200px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            STACK::
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              CAPABILITIES
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base font-mono">
            Indexation des technologies maîtrisées et niveaux d'intégration système.
          </p>
        </div>

        {/* Boutons de filtrage */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                  : 'bg-gray-900/40 text-gray-500 border-gray-800/60 hover:border-gray-700 hover:text-gray-300'
              }`}
            >
              {cat === 'all' ? 'ALL_MODULES' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Loader Réseau */}
        {loading && (
          <div className="text-center py-20 font-mono text-sm text-gray-500 tracking-widest animate-pulse">
            SCANNING_SYSTEM_SKILLS...
          </div>
        )}

        {/* Grille de Cartes Animées */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 [perspective:1000px]">
          {!loading &&
            filteredSkills.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
