import { Routes, Route, Link } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import Create from "./pages/Create";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import EndPage from "./pages/EndPage";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Page d'accueil avec lien vers création */}
          <Route
            path="/"
            element={
              <div className="text-center py-16 px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">TheEnd.Page 💥</h1>
                <p className="mb-6 text-gray-300">Crée ta page de départ… avec style.</p>
                <Link
                  to="/create"
                  className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded text-lg transition"
                >
                  Créer ✨
                </Link>
              </div>
            }
          />

          {/* Pages secondaires */}
          <Route path="/create" element={<Create />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/end/:id" element={<EndPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
