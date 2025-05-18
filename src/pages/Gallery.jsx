
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export default function Gallery() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const { data, error } = await supabase
          .from('end_pages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPages(data);
      } catch (err) {
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10">
        Chargement des pages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Erreur : {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-black text-white">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        📸 Galerie des pages de départ
      </h1>

      {pages.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucune page enregistrée.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pages.map((page) => (
            <div
              key={page.id}
              className="bg-white text-black rounded-lg p-4 shadow hover:scale-105 transform transition"
            >
              <h2 className="font-bold text-lg mb-2">{page.tone}</h2>
              <p className="text-sm mb-2 line-clamp-4">{page.message}</p>
              {page.image_url && (
                <img
                  src={page.image_url}
                  alt="media"
                  className="w-full h-40 object-cover rounded"
                />
              )}
              {page.gif_url && (
                <img
                  src={page.gif_url}
                  alt="GIF"
                  className="w-full h-40 object-cover rounded"
                />
              )}
              {page.video_url && (
                <video
                  src={page.video_url}
                  className="w-full h-40 object-cover rounded"
                  controls
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
