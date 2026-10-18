import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import ProjectList from "./composents/ProjectList.jsx";
import Index from "./Pages/Home/HomePage/Index.jsx";
import AddProjectForm from "./Pages1/AddProjectForm/AddProjectForm.jsx";
console.log("=== DEBUG CONFIG ===");
console.log("Hostname:", window.location.hostname);
console.log("is onrender:", window.location.hostname.includes("onrender.com"));

import { BACKEND_URL } from "./config";
import ContactSuccess from "./Pages/Home/ContactSucces.jsx";
console.log("BACKEND_URL:", BACKEND_URL);
console.log("Type of BACKEND_URL:", typeof BACKEND_URL);
console.log("=== END DEBUG ===");
// ⭐⭐ FIN DU DEBUG ⭐⭐
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add_projects" element={<AddProjectForm />} />
        <Route path="/projects_lists" element={<ProjectList />} />
        <Route path="/contact/success" element={<ContactSuccess />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-50">
              <main>
                <Index />
              </main>
            </div>
          }
        />
        
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <h1 className="text-3xl font-bold">404 - Page non trouvée</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
