// components/ScrollLink.jsx
import React from "react";

const ScrollLink = ({ to, children, className = "", offset = 80 }) => {
  const handleClick = (e) => {
    e.preventDefault();

    const element = document.getElementById(to);
    if (element) {
      // Calculer la position avec offset pour la navbar fixe
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Optionnel: mettre à jour l'URL sans recharger
      window.history.pushState(null, null, `#${to}`);
    }
  };

  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </a>
  );
};

export default ScrollLink;
