import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';

export default function EndPage() {
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      const { data, error } = await supabase.from('end_pages').select('*').eq('id', id).single();

      if (error) {
        setError(error.message);
      } else {
        setPage(data);
      }
    };

    fetchPage();
  }, [id]);

  if (error) return <div className="text-red-500 text-center p-6">Erreur : {error}</div>;
  if (!page) return <div className="text-gray-400 text-center p-6">Chargement...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">{page.tone}</h1>
      <p className="text-xl mb-6">{page.message}</p>

      {page.image_url && (
        <>
          {page.image_url.endsWith('.webm') ? (
            <video src={page.image_url} controls className="mx-auto max-w-lg rounded" />
          ) : (
            <img src={page.image_url} alt="media" className="mx-auto max-w-lg rounded" />
          )}
        </>
      )}

      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Lien copié !");
        }}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
      >
        🔗 Copier le lien
      </button>
    </div>
  );
}
