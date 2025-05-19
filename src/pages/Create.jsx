import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const tones = [
  { label: "Dramatique", emoji: "🎭" },
  { label: "Ironie", emoji: "🙃" },
  { label: "Grincer des dents", emoji: "😬" },
  { label: "Classe", emoji: "🕶️" },
  { label: "Touchant", emoji: "🥹" },
  { label: "Absurde", emoji: "🤪" },
  { label: "Passif-agressif", emoji: "😒" },
  { label: "Honnête", emoji: "💬" },
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Tu dois être connecté !");
    if (!tone || !message.trim()) return alert("Tous les champs sont requis");

    const payload = {
      utilisateur_id: user.id,
      tone,
      message,
      gif_url: selectedMedia?.type === 'gif' ? selectedMedia.url : null,
      video_url: selectedMedia?.type === 'video' ? selectedMedia.url : null,
    };

    setLoading(true);
    const { error } = await supabase.from('end_pages').insert([payload]);
    setLoading(false);

    if (error) {
      alert("Erreur Supabase: " + error.message);
    } else {
      alert("Page créée avec succès !");
      window.location.href = '/gallery';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Créer ta page de départ</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">

        <div className="flex flex-wrap justify-center gap-3">
          {tones.map(({ label, emoji }) => (
            <button
              type="button"
              key={label}
              onClick={() => setTone(label)}
              className={`px-4 py-2 rounded flex items-center gap-2 ${
                tone === label ? 'bg-red-600 text-white' : 'bg-white text-black'
              }`}
            >
              {emoji} {label}
            </button>
          ))}
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 text-black rounded bg-white"
          rows={6}
          placeholder="Écris ton message de départ ici..."
        />

        <div>
          <p className="mb-2 font-semibold">Choisis un média :</p>
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

        {selectedMedia && (
          <div className="mt-6">
            <p className="mb-2 text-sm text-gray-300">Aperçu :</p>
            {selectedMedia.type === "gif" ? (
              <img src={selectedMedia.url} className="w-full max-h-64 object-contain rounded" />
            ) : (
              <video src={selectedMedia.url} controls className="w-full max-h-64 rounded" />
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? "Création..." : "Créer ma page 💥"}
        </button>
      </form>
    </div>
  );
}
