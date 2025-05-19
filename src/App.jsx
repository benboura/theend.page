import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Contact from './Contact';
import Create from './Create'; 
import Gallery from './Gallery';
import Connexion from './Connexion'; 
import Inscription from './Inscription'; 
import axios from 'axios'; // Pour récupérer les posts


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


        <Link
          to="/create"
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Commencer
        </Link>

        {/* Afficher les posts populaires uniquement sur la page d'accueil */}
        <div className="mt-8 w-full max-w-xl">
          <h2 className="text-3xl mb-4">Posts Populaires</h2>
          {loading && <div>Chargement des posts...</div>}
          {error && <div>{error}</div>}
          <ul className="space-y-4">
            {posts.slice(0, 5).map((post) => ( // Afficher les 5 posts les plus populaires
              <li key={post.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p>{post.description}</p>

                {/* Affichage du gif */}
                <div className="mt-4">
                  <img src={post.gif} alt={post.title} className="w-full rounded-md" />
                </div>

                {/* Bouton Like et affichage des likes */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg">Likes: {post.likes}</span>
                  <button
                    onClick={() => handleLike(post.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                  >
                    J'aime
                  </button>
                </div>
              </li>
            ))}
          </ul>
            <Footer />
        </div>
  </div>)

        {/* Configuration des routes */}
        <Switch>
          <Route path="/create" component={Create} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/connexion" component={Connexion} />
          <Route path="/inscription" component={Inscription} />
          <Route path="/contact" component={Contact} />
        </Switch>


}

