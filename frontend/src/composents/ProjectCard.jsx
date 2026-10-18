import React, { useState } from "react";
import { deleteProject } from "../services/api";
import { Edit, Delete, GitHub, Link } from "@mui/icons-material";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { BACKEND_URL } from "../config";
const ProjectCard = ({ project, onDelete, onEdit }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const getImageUrl = (screenshot) => {
    if (!screenshot) return "";

    if (screenshot.startsWith("http")) return screenshot;

    if (screenshot.startsWith("/")) {
      return `${window.location.origin}${screenshot}`;
    }

    return `${BACKEND_URL}${screenshot}`;
  };
  const handleDelete = async () => {
    console.log("🔄 Suppression projet ID:", project.id);

    setDeleting(true);
    try {
      // Appelle l'API
      await deleteProject(project.id);

      // Succès : notifie le parent
      onDelete(project.id);
    } catch (error) {
      console.error("❌ Erreur complète:", error);

      // CORRECTION : utilise 'error.response' pas 'response'
      if (error.response?.status === 404) {
        alert(`Le projet "${project.title}" n'existe plus sur le serveur.`);
        // ⚠️ SUPPRIME CETTE LIGNE :
        // onDelete(project.id); // ← ENLÈVE-MOI !
      } else {
        // CORRECTION : error.response pas response
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          "Erreur inconnue";
        alert(`Échec de la suppression: ${errorMessage}`);
      }
    } finally {
      setDeleting(false);
      setOpenDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group relative">
        {/* BOUTONS D'ACTION - TOUJOURS VISIBLES AU HOVER */}
        <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <IconButton
            size="small"
            onClick={() => onEdit(project)}
            className="bg-white hover:bg-gray-100 shadow"
            title="Modifier"
          >
            <Edit fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => setOpenDeleteDialog(true)}
            className="bg-white hover:bg-red-50 shadow"
            title="Supprimer"
          >
            <Delete fontSize="small" />
          </IconButton>
        </div>

        {/* SCREENSHOTS (seulement si existent) */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="border-b">
            <div className="grid grid-cols-2 gap-1 p-1">
              {project.screenshots.slice(0, 2).map((screenshot, index) => {
                const imageUrl = screenshot.startsWith("http")
                  ? screenshot
                  : `${BACKEND_URL}${screenshot}`;

                return (
                  <img
                    key={index}
                    src={getImageUrl(screenshot)}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                    onError={(e) => {
                      e.target.style.display = "none";
                      console.error("Admin image failed:", screenshot);
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* CONTENU DU PROJET */}
        <div className="p-4">
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
            <div className="flex flex-wrap gap-1 mb-3">
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

      {/* DIALOG DE CONFIRMATION SUPPRESSION */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer le projet{" "}
            <strong>"{project.title}"</strong> ?
            <br />
            Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            disabled={deleting}
          >
            Annuler
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectCard;
