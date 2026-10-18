// components/NavBar.jsx
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import ScrollLink from '../../composents/ScrollLink/ScrollLink';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    // 🌌 Barre principale en Glassmorphism sombre avec bordure inférieure subtile
    <nav className="fixed top-0 w-full bg-[#0B0F19]/70 backdrop-blur-md z-50 border-b border-gray-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto px-4">
        {/* Changement de h-8 à h-16 pour donner de l'espace et de l'élégance */}
        <div className="flex justify-between items-center h-16">
          {/* 🚀 Logo modernisé en adéquation avec le thème */}
          <ScrollLink
            to="hero"
            className="text-xl font-extrabold tracking-tight text-white hover:opacity-90 transition group"
          >
            Mamadou
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:animate-pulse">
              .dev
            </span>
          </ScrollLink>

          {/* 💻 Desktop Menu (Style minimaliste, texte gris clair, hover bleu électrique) */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                className="relative text-gray-400 hover:text-white font-medium text-sm tracking-wide transition-colors duration-300 before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-[2px] before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 hover:before:w-full before:transition-all before:duration-300"
                offset={item.id === 'hero' ? 0 : 80}
              >
                {item.label}
              </ScrollLink>
            ))}
          </div>

          {/* 📱 Mobile Menu Button (Icônes adaptées au mode sombre) */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
          </button>
        </div>

        {/* 📱 Mobile Menu déroulant (Effet de volet sombre texturé) */}
        {isOpen && (
          <div className="md:hidden bg-[#0B0F19]/95 border-t border-gray-800 backdrop-blur-xl absolute top-16 left-0 w-full shadow-2xl animate-fadeIn">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 border border-transparent hover:border-blue-500/20 rounded-xl font-medium transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </ScrollLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
