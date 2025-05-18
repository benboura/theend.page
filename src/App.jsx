import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

import Create from './pages/Create';
import Gallery from './pages/Gallery';
import EndPage from './pages/EndPage';
import Contact from './pages/Contact';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/create" element={<Create />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/end/:id" element={<EndPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

