import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Gallery() {
  const [pages, setPages] = useState([]); // Déclare le state pour stocker les pages
  const [loading, setLoading] = useState(true); // Déclare un state pour savoir si on est en train de charger
  const [error, setError] = useState(null); // Déclare un state pour gérer les erreurs

  useEffect(() => {
    // Fonction pour récupérer les pages depuis l'API
    const fetchPages = async () => {
      try {
        // Envoie une requête GET vers ton API (ajuste l'URL de ton serveur si nécessaire)
        const response = await fetch('http://localhost:3001/api/gallery');
        
        // Vérifie si la réponse est correcte (status 200)
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des pages');
        }

        const data = await response.json();
        setPages(data); // Remplit le state 'pages' avec les données récupérées
      } catch (err) {
        setError(err.message); // Capture l'erreur et la place dans le state 'error'
      } finally {
        setLoading(false); // Lorsque la requête est terminée (succès ou échec), on arrête de charger
      }
    };

    fetchPages(); // Appel de la fonction fetchPages au chargement du composant
  }, []); // Le tableau vide [] fait en sorte que cet effet se lance uniquement au montage du composant

  if (loading) {
    return <div className="text-center text-gray-400">Chargement des pages...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Erreur: {error}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-black text-white relative overflow-hidden">
      <h1 className="text-4xl font-bold mb-6 text-center">💥 Galerie des Départs</h1>
      {pages.length === 0 ? (
        <p className="text-center text-gray-400">Aucune page enregistrée</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Link
              key={page.id}
              to={`/end/${page.id}`}
              className="bg-white text-black rounded p-4 shadow hover:scale-105 transition transform"
            >
              <h2 className="font-bold text-lg mb-2">{page.tone}</h2>
              <p className="truncate">{page.message}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
