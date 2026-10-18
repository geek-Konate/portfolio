import React, { useState } from "react";
import { GitHub, Link, ChevronLeft, ChevronRight } from "@mui/icons-material";

const AllPublicProject = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project.screenshots || project.screenshots.length === 0) {
    return <ProjectCardWithoutImages project={project} />;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white  rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* CARROUSEL D'IMAGES */}
      <div className="relative h-64  overflow-hidden bg-gray-100">
        <img
          src={
            project.screenshots[currentImageIndex].startsWith("http")
              ? project.screenshots[currentImageIndex]
              : `http://localhost:8000${project.screenshots[currentImageIndex]}`
          }
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* CONTROLES DU CARROUSEL */}
        {project.screenshots.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="opacity-0 group-hover:opacity-100 absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors "
            >
              <ChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="opacity-0 group-hover:opacity-100 duration-300 absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
            >
              <ChevronRight />
            </button>

            {/* INDICATEURS */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {project.screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* BADGE FEATURED */}
        {project.featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ★ Projet phare
          </div>
        )}
      </div>

      {/* CONTENU (identique à la version précédente) */}
      <div className="p-5">
        {/* ... même contenu que la première version ... */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 truncate">
            {project.title}
          </h3>
          {project.featured && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">
              ★
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* TECHNOLOGIES */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-purple-700 text-xs rounded-full border-2 border-purple-500"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* LIENS */}
        <div className="flex justify-between items-center pt-3 border-t">
          <div className="flex gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
                title="GitHub"
              >
                <GitHub fontSize="small" />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
                title="Live Demo"
              >
                <Link fontSize="small" />
              </a>
            )}
          </div>

          <div className="text-xs text-gray-500">
            {new Date(project.created_at).toLocaleDateString("fr-FR")}
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour les projets sans images
const ProjectCardWithoutImages = ({ project }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div className="h-48 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-6">
      <div className="text-5xl mb-4">📁</div>
      <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
        {project.title}
      </h3>
      <p className="text-gray-600 text-center text-sm">
        {project.description.substring(0, 100)}...
      </p>
    </div>

    <div className="p-5">{/* ... même contenu que le reste ... */}</div>
  </div>
);

export default AllPublicProject;
