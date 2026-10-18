import { ArrowRight, FilterList, GitHub } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Headling from '../../composents/Headling/Headling';
import PublicProjectCard from '../../composents/PublicProjectCard/PublicProjectCard';
import { BACKEND_URL } from '../../config';

export default function MyPortfolio() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTech, setSelectedTech] = useState('all');
  const [displayCount, setDisplayCount] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error('Invalid projects format:', data);
          setProjects([]);
          setFilteredProjects([]);
          return;
        }

        const sortedProjects = [...data].sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setProjects(sortedProjects);
        setFilteredProjects(sortedProjects);
      })
      .catch((err) => {
        console.error('Fetch projects failed:', err);
        setProjects([]);
        setFilteredProjects([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Extraction des 6 technologies les plus représentées pour un affichage propre
  const allTechnologies = [...new Set(projects.flatMap((p) => p.technologies || []))].slice(0, 6);

  // Filtrer par technologie
  useEffect(() => {
    if (selectedTech === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.technologies?.includes(selectedTech)));
    }
    setDisplayCount(3); // Réinitialise le compte à l'affichage lors d'un changement de filtre
  }, [selectedTech, projects]);

  const visibleProjects = filteredProjects.slice(0, displayCount);

  return (
    <section
      id="portfolio"
      className="relative w-full py-20 md:py-28 bg-[#0B0F19] text-gray-300 overflow-hidden border-t border-gray-900"
    >
      {/* Halos lumineux d'ambiance en arrière-plan */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 🛰️ Header de la section */}
        <div className="text-center mb-16">
          <Headling hightlight="Mon Portfolio" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Exploration des systèmes et applications déployés. Chaque projet matérialise un défi
            technique relevé.
          </p>
        </div>

        {/* 🎛️ Barre de commandes : Filtres & Stats Réseau */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-900">
          {/* Filtres typés Cyber / Onglets de terminaux */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-mono mr-2 bg-gray-900/40 px-3 py-1.5 border border-gray-800/60 rounded-lg">
              <FilterList fontSize="small" className="text-blue-400" />
              <span>FILTER::TECH</span>
            </div>

            <button
              onClick={() => setSelectedTech('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-300 border ${
                selectedTech === 'all'
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'bg-gray-900/20 text-gray-400 border-gray-800/80 hover:border-gray-700 hover:text-gray-300'
              }`}
            >
              ALL_SYS
            </button>

            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-300 border ${
                  selectedTech === tech
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                    : 'bg-gray-900/20 text-gray-400 border-gray-800/80 hover:border-gray-700 hover:text-gray-300'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Mini-moteur d'état à droite */}
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-gray-500 bg-gray-900/20 px-4 py-2 border border-gray-900 rounded-xl">
            <div>
              TOTAL_RECORDS: <span className="text-white font-bold">{projects.length}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
            <div>
              FILTERED: <span className="text-blue-400 font-bold">{filteredProjects.length}</span>
            </div>
          </div>
        </div>

        {/* 🖥️ Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <PublicProjectCard key={project.id} project={project} featured={project.featured} />
          ))}
        </div>

        {/* 🛰️ État de chargement ou Aucun projet trouvé */}
        {loading && (
          <div className="text-center py-20 font-mono">
            <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-gray-500 tracking-widest animate-pulse">
              FETCH_DATA_FROM_NODES...
            </p>
          </div>
        )}

        {!loading && visibleProjects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-800 bg-gray-900/10 rounded-2xl font-mono">
            <div className="text-3xl mb-3 text-purple-400">🚨</div>
            <h3 className="text-base font-semibold text-gray-300 mb-1">NO_PROJECTS_FOUND</h3>
            <p className="text-xs text-gray-500">
              Aucun artefact ne correspond à ce critère d'indexation.
            </p>
          </div>
        )}

        {/* 🔘 Pied de zone : Actions de pagination & Profil externe */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-12 pt-6 border-t border-gray-900/60">
          <div>
            {displayCount < filteredProjects.length ? (
              <button
                onClick={() => setDisplayCount((prev) => prev + filteredProjects.length)}
                className="group w-full sm:w-auto px-6 py-3 border border-gray-800 hover:border-blue-500/40 bg-gray-900/30 text-sm font-medium text-gray-300 hover:text-white rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2.5 shadow-sm"
              >
                <span>Déployer {filteredProjects.length - displayCount} architectures</span>
                <ArrowRight
                  fontSize="small"
                  className="group-hover:translate-x-1 text-blue-400 transition"
                />
              </button>
            ) : (
              <div className="text-xs font-mono text-gray-600">
                [END_OF_STACK::Tous les projets locaux sont indexés]
              </div>
            )}
          </div>

          <a
            href="https://github.com/geek-Konate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3 bg-white text-[#0B0F19] hover:bg-gray-200 rounded-xl font-medium text-sm transition-all duration-300 shadow-md"
          >
            <GitHub fontSize="small" />
            <span>Ouvrir GitHub Repository</span>
          </a>
        </div>
      </div>
    </section>
  );
}
