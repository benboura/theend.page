import { useState } from 'react'
import ToneSelector from '../components/ToneSelector'
import Navbar from '../Navbar'
import Footer from '../Footer'

// MESSAGES
const toneMessages = {
  'Dramatique': [
    "Je pars, mais mon fantôme hantera encore vos réunions.",
    "Adieu. La vie continue… pour vous.",
  ],
  'Ironique': [
    "C'était… une aventure. Je suppose.",
    "Merci pour tous ces moments… gênants.",
  ],
  'Cringe': [
    "Bye bye la team, vous allez me manquer (ou pas 😬).",
    "C'était long, c'était fort, c'était… bizarre.",
  ],
  'Classe': [
    "Merci pour tout. Je vous souhaite le meilleur.",
    "Je pars en paix, avec le sourire.",
  ],
  'Touchant': [
    "Chaque moment restera gravé dans ma mémoire.",
    "Merci d’avoir fait partie de mon histoire.",
  ],
  'Absurde': [
    "Je pars rejoindre un cirque de licornes.",
    "Ma mission intergalactique m'appelle. 🛸",
  ],
  'Passif-agressif': [
    "J’aurais aimé pouvoir dire que c’était agréable.",
    "Bon vent à moi-même.",
  ],
  'Honnête': [
    "Il était temps. Merci à ceux qui ont rendu ça supportable.",
    "Je fais ce qu’il fallait faire.",
  ],
}

// GIFS
const mediaOptions = [
  { type: "gif", url: "/media/gifs/Its Over Basketball GIF by NBA.gif" },
  { type: "gif", url: "/media/gifs/its over GIF.gif" },
  { type: "gif", url: "/media/gifs/Jimmy Fallon Love GIF by The Tonight Show Starring Jimmy Fallon.gif" },
  { type: "gif", url: "/media/gifs/Laughing Man Lol GIF.gif" },
  // Ajoute d'autres options si nécessaire
  { type: "video", url: "/media/video/stock-footage-angry-boss.webm" },
  { type: "video", url: "/media/video/stock-footage-bored-male-manger.webm" }
]

export default function Create() {
  const [tone, setTone] = useState('')
  const [message, setMessage] = useState('')
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!tone || !message.trim()) {
      alert('Complète tous les champs !')
      return
    }

    const id = crypto.randomUUID()
    const payload = {
      id,
      tone,
      message,
      media: selectedMedia, // Ajout du média sélectionné
    }

    // Sauvegarde dans le localStorage
    localStorage.setItem(`theend-${id}`, JSON.stringify(payload))

    try {
      setLoading(true)
      setError(null)

      // Envoi des données au serveur via fetch
const response = await fetch('http://localhost:3001/api/create', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message au serveur.')
      }

      const data = await response.json()
      console.log('Serveur:', data)

      // Redirection après succès
      window.location.href = `/end/${id}`
    } catch (err) {
      setError(err.message)
      console.error('Erreur serveur:', err)
      alert("Une erreur est survenue côté serveur.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-black to-red-900 text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Crée ta page de départ</h1>

        {error && <p className="text-red-500">{error}</p>} {/* Affiche l'erreur si présente */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <ToneSelector selectedTone={tone} setSelectedTone={setTone} />

          {tone && (
            <button
              type="button"
              onClick={() => {
                const pool = toneMessages[tone]
                if (pool) {
                  const random = pool[Math.floor(Math.random() * pool.length)]
                  setMessage(random)
                }
              }}
              className="mb-4 px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            >
              Générer un message automatique
            </button>
          )}

          <div>
            <label className="block text-lg font-semibold mb-2">Ton message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="8"
              placeholder="Raconte ta vérité..."
              className="w-full p-4 rounded text-black"
              required
            />
          </div>

          {/* Sélecteur de média */}
          <div>
            <label className="block text-lg font-semibold mb-2">Choisis un GIF, une image ou une vidéo</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mediaOptions.map((media, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedMedia(media)}
                  className={`cursor-pointer border-4 rounded overflow-hidden ${
                    selectedMedia?.url === media.url ? 'border-red-500' : 'border-transparent'
                  }`}
                >
                  {media.type === "video" ? (
                    <video src={media.url} className="w-full h-32 object-cover" muted loop />
                  ) : (
                    <img src={media.url} alt="media" className="w-full h-32 object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Aperçu du média */}
          {selectedMedia && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Aperçu du média choisi :</p>
              {selectedMedia.type === "video" ? (
                <video src={selectedMedia.url} controls className="w-full max-h-64 rounded" />
              ) : (
                <img src={selectedMedia.url} alt="preview" className="w-full max-h-64 object-contain rounded" />
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
            disabled={loading}
          >
            {loading ? 'Création en cours...' : 'Créer ma page 💥'}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  )
}