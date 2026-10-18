import React, { useState, useEffect } from "react";
import { updateProject, getProject } from "../services/api";
import { Save, Close } from "@mui/icons-material";
import {
  TextField,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";

const EditProjectForm = ({ projectId, open, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    newTech: "",
    github_url: "",
    live_url: "",
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Charge les données du projet
  useEffect(() => {
    if (open && projectId) {
      loadProjectData();
    }
  }, [open, projectId]);

  const loadProjectData = async () => {
    setLoading(true);
    try {
      const project = await getProject(projectId);
      setFormData({
        title: project.title || "",
        description: project.description || "",
        technologies: project.technologies || [],
        newTech: "",
        github_url: project.github_url || "",
        live_url: project.live_url || "",
        featured: project.featured || false,
      });
    } catch (error) {
      console.error("Error loading project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Prépare les données pour l'update
      const updateData = {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies,
        github_url: formData.github_url || null,
        live_url: formData.live_url || null,
        featured: formData.featured,
      };

      const updatedProject = await updateProject(projectId, updateData);

      setSuccess(true);
      setTimeout(() => {
        onUpdate(updatedProject); // Notifie le parent
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  // Fonctions pour technologies (similaires à AddProjectForm)
  const addTech = () => {
    if (
      formData.newTech.trim() &&
      !formData.technologies.includes(formData.newTech.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, prev.newTech.trim()],
        newTech: "",
      }));
    }
  };

  const removeTech = (techToRemove) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tech) => tech !== techToRemove),
    }));
  };

  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent className="flex justify-center items-center h-64">
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        Modifier le projet
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {success && (
          <Alert severity="success" className="mb-4">
            Projet mis à jour avec succès !
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <TextField
              fullWidth
              label="Titre du projet"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />

            <div className="space-y-2">
              <div className="flex gap-2">
                <TextField
                  fullWidth
                  size="small"
                  label="Ajouter une technologie"
                  value={formData.newTech}
                  onChange={(e) =>
                    setFormData({ ...formData, newTech: e.target.value })
                  }
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTech())
                  }
                />
                <Button variant="outlined" onClick={addTech}>
                  Ajouter
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    onDelete={() => removeTech(tech)}
                    className="bg-blue-100 text-blue-800"
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Lien GitHub"
                value={formData.github_url}
                onChange={(e) =>
                  setFormData({ ...formData, github_url: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Lien Live"
                value={formData.live_url}
                onChange={(e) =>
                  setFormData({ ...formData, live_url: e.target.value })
                }
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="mr-2"
              />
              <label htmlFor="featured" className="text-sm text-gray-700">
                Mettre en avant (Featured)
              </label>
            </div>
          </div>

          <DialogActions>
            <Button onClick={onClose} disabled={saving}>
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              startIcon={saving ? <CircularProgress size={20} /> : <Save />}
            >
              {saving ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectForm;
