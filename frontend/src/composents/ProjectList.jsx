import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import EditProjectForm from "./EditProjectForm";
import { getProjects } from "../services/api";
import { Button, Snackbar, Alert } from "@mui/material";
import { Add } from "@mui/icons-material";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (deletedId) => {
    // Trouve le projet supprimé pour le message
    const deletedProject = projects.find((p) => p.id === deletedId);

    setProjects((prev) => prev.filter((p) => p.id !== deletedId));

    // Affiche une notification
    setNotification({
      message: `Projet "${deletedProject?.title || "Inconnu"}" supprimé`,
      severity: "info",
    });

    console.log("Nombre actuel de projets:", projects.length - 1);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleUpdate = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    setEditingProject(null);

    setNotification({
      message: `Projet "${updatedProject.title}" mis à jour`,
      severity: "success",
    });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Chargement des Projets...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* NOTIFICATION */}
      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification?.severity || "info"}
          className="shadow-lg"
        >
          {notification?.message}
        </Alert>
      </Snackbar>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Mes Projets</h1>

          {/* COMPTEUR ANIMÉ */}
          <div className="relative">
            <span className="text-3xl font-bold text-blue-600">
              {projects.length}
            </span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          </div>
        </div>

        <Button variant="contained" startIcon={<Add />} href="/add_projects">
          Nouveau Projet
        </Button>
      </div>

      {/* STATISTIQUES */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-4 rounded-lg mb-6 flex gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-700">
            {projects.length}
          </div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-700">
            {projects.filter((p) => Boolean(p?.featured)).length}
          </div>
          <div className="text-sm text-gray-600">En vedette</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-700">
            {projects.filter((p) => Boolean(p?.featured)).length}
          </div>
          <div className="text-sm text-gray-600">Avec images</div>
        </div>
      </div>

      {/* LISTE DES PROJETS */}
      {projects.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Aucun projet
          </h3>
          <p className="text-gray-500 mb-6">
            Commencez par créer votre premier projet
          </p>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            href="/add_projects"
          >
            Créer mon premier projet
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Cliquez sur un projet pour voir les options
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </>
      )}

      {/* MODAL D'ÉDITION */}
      {editingProject && (
        <EditProjectForm
          projectId={editingProject.id}
          open={!!editingProject}
          onClose={() => setEditingProject(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ProjectList;
