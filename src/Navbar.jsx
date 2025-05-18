import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-black text-white py-4 border-b border-red-600 shadow">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold text-white">
          La Fin.Page <span className="text-red-500">💥</span>
        </Link>

        <div className="flex gap-6 text-sm md:text-base">
          <Link to="/create" className="hover:text-red-400">Créer</Link>
          <Link to="/gallery" className="hover:text-red-400">Galerie</Link>
          <Link to="/contact" className="hover:text-red-400">Contact</Link>
          <Link to="/connexion" className="hover:text-red-400">Se connecter</Link>
          <Link to="/inscription" className="hover:text-red-400">S'inscrire</Link>
        </div>
      </div>
    </nav>
  );
}
