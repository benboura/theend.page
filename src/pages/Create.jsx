import { useState } from 'react';
import { supabase } from '../supabase';
import Navbar from '../Navbar';
import Footer from '../Footer';

const tones = [
  "Dramatique", "Ironie", "Grincer des dents",
  "Classe", "Touchant", "Absurde",
  "Passif-agressif", "Honnête"
];

const mediaOptions = [
  { type: "gif", url: "/media/gifs/Its Over Basketball GIF by NBA.gif" },
  { type: "gif", url: "/media/gifs/its over GIF.gif" },
  { type: "gif", url: "/media/gifs/Jimmy Fallon Love GIF by The Tonight Show Starring Jimmy Fallon.gif" },
  { type: "gif", url: "/media/gifs/Laughing Man Lol GIF.gif" },
  { type: "video", url: "/media/video/stock-footage-angry-boss.webm" },
  { type: "video", url: "/media/video/stock-footage-bored-male-manger.webm" }
];

export default function CreatePage() {
  const [tone, setTone] = useState('');
  const [message, setMessage] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tone || !message.trim()) {
      alert("Merci de remplir tous les champs !");
      return;
    }

    setLoading(true);

    const payload = {
      id: crypto.randomUUID(),
      tone,
      message,
      gif_url: selectedMedia?.type === 'gif' ? selectedMedia.url : null,
      video_url: selectedMedia?.type === 'video' ? selectedMedia.url : null,
      created_at: new Date().toISOString(), // facultatif si Supabase le fait automatiquement
    };

    const { error } = await supabase.from('end_pages').insert([payload]);

    setLoading(false);

    if (error) {
      alert(`Erreur Supabase : ${error.message}`);
      console.error(error);
    } else {
      alert("Message publié avec succès !");
      window.location.href = '/gallery'; // ou `/end/${payload.id}` si tu veux un lien direct
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
    

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Créer ta page de départ</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-wrap justify-center gap-3">
            {tones.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTone(t)}
                className={`px-4 py-2 rounded ${
                  tone === t ? 'bg-red-600 text-white' : 'bg-white text-black'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ton message"
            className="w-full p-4 text-black rounded"
            rows={6}
          />

          <div>
            <p className="mb-2">Choisis un média :</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mediaOptions.map((media, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedMedia(media)}
                  className={`cursor-pointer border-4 rounded overflow-hidden ${
                    selectedMedia?.url === media.url ? 'border-red-500' : 'border-transparent'
                  }`}
                >
                  {media.type === "gif" ? (
                    <img src={media.url} alt="gif" className="w-full h-32 object-cover" />
                  ) : (
                    <video src={media.url} className="w-full h-32 object-cover" muted loop />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Création..." : "Créer ✨"}
          </button>
        </form>
      </div>

    </div>
  );
}

