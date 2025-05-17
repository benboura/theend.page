import React from 'react';
import { Link } from 'react-router-dom'; // Import de Link depuis react-router-dom

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/create">Créer votre page</Link></li>
        <li><Link to="/gallery">Vos pages</Link></li>
        <li><Link to="/connexion">Se connecter</Link></li>
        <li><Link to="/inscription">S'inscrire</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

