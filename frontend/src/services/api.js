import axios from 'axios';
const API_BASE_URL = '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// reccupreation de tous les projects
export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};
// créer un projects
export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};
// supprimer un project
export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);

  return response.data;
};
// met à jour un project
export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};
// Récupère un seul projet
export const getProject = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};
// Ajoute des screenshots à un projet existant
export const addScreenshotsToProject = async (projectId, files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('new_files', file);
  });
  const response = await api.patch(`/projects/${projectId}/screenshots`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
export const uploadScreenshots = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file); // Nom important: 'files' (pluriel)
  });

  try {
    const response = await api.post('/upload/screenshots', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Retourne seulement les URLs
    return response.data.urls;
  } catch (error) {
    console.error('Upload error:', error.response?.data || error.message);
    throw error;
  }
};

//
