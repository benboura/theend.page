import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/creer">Créer votre page</a></li>
        <li><a href="/pages">Vos pages</a></li>
        <li><a href="/connexion">Se connecter</a></li>
        <li><a href="/inscription">S'inscrire</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
