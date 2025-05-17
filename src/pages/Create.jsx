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
  { type: "gif", url: "/media/gifs/Leaving See Ya GIF by Robert E Blackmon.gif" },
  { type: "gif", url: "/media/gifs/Lonely Freedom GIF by Jeremy Renner.gif" },
  
  { type: "gif", url: "/media/gifs/megan fox GIF by New Girl.gif" },
  { type: "gif", url: "/media/gifs/Milf Goodbye GIF by Fergie.gif" },
  { type: "gif", url: "/media/gifs/Oh My God Omg GIF.gif" },
  { type: "gif", url: "/media/gifs/Ok Bye I Am Leaving GIF.gif" },
  { type: "gif", url: "/media/gifs/Over It Starz GIF by Run The World.gif" },
  { type: "gif", url: "/media/gifs/Peace Out GIF.gif" },

  { type: "gif", url: "/media/gifs/Peace Out Goodbye GIF by NETFLIX.gif" },
  { type: "gif", url: "/media/gifs/Peace Out Reaction GIF.gif" },
  { type: "gif", url: "/media/gifs/real housewives nene GIF.gif" },
  { type: "gif", url: "/media/gifs/Sad Animation GIF by Holler Studios.gif" },
  { type: "gif", url: "/media/gifs/Sad Anthony Anderson GIF.gif" },
  { type: "gif", url: "/media/gifs/Sad Its Over GIF by Pudgy Memez.gif" },

  { type: "gif", url: "/media/gifs/Sad Pauly D GIF by A Double Shot At Love With DJ Pauly D and Vinny.gif" },
  { type: "gif", url: "/media/gifs/Sad Tobey Maguire GIF.gif" },
  { type: "gif", url: "/media/gifs/Santi Im Free GIF by ABC Network.gif" },
  { type: "gif", url: "/media/gifs/Season 2 Dancing GIF by The Fresh Prince of Bel-Air.gif" },
  { type: "gif", url: "/media/gifs/Season 2 Lol GIF by Insecure on HBO.gif" },
  { type: "gif", url: "/media/gifs/Season 18 Omg GIF by America's Got Talent.gif" },

  { type: "gif", url: "/media/gifs/See Ya Goodbye GIF by PUMA.gif" },
  { type: "gif", url: "/media/gifs/Shocked Season 6 GIF by grown-ish.gif" },
  { type: "gif", url: "/media/gifs/Thank God Relief GIF by Team Coco.gif" },
  { type: "gif", url: "/media/gifs/Thank You So Much GIF by euphoria.gif" },
  { type: "gif", url: "/media/gifs/The Office Crying GIF.gif" },
  { type: "gif", url: "/media/gifs/the office rage GIF.gif" },

  { type: "gif", url: "/media/gifs/Unimpressed Viola Davis GIF.gif" },
  { type: "gif", url: "/media/gifs/Wave Goodbye GIF by Beauty Brands.gif" },
  { type: "gif", url: "/media/gifs/We Did It Darrel Kennedy GIF by Girl Starter.gif" },
  { type: "gif", url: "/media/gifs/Will Ferrell Lol GIF by First We Feast.gif" },
  { type: "gif", url: "/media/gifs/win GIF.gif" },
  { type: "gif", url: "/media/gifs/1.a.gif" },

  { type: "gif", url: "/media/gifs/1.b.gif" },
  { type: "gif", url: "/media/gifs/2.a.gif" },
  { type: "gif", url: "/media/gifs/2.b.gif" },
  { type: "gif", url: "/media/gifs/3.a.gif" },
  { type: "gif", url: "/media/gifs/3.b.gif" },
  { type: "gif", url: "/media/gifs/4.a.gif" },

  { type: "gif", url: "/media/gifs/4.b.gif" },
  { type: "gif", url: "/media/gifs/5.a.gif" },
  { type: "gif", url: "/media/gifs/6.a.gif" },
  { type: "gif", url: "/media/gifs/7.a.gif" },
  { type: "gif", url: "/media/gifs/8.a.gif" },
  { type: "gif", url: "/media/gifs/9.a.gif" },

  { type: "gif", url: "/media/gifs/Episode 9 Sigh GIF by One Chicago.gif" },
  { type: "gif", url: "/media/gifs/Exit Leaving GIF by Sleep On It.gif" },
  { type: "gif", url: "/media/gifs/ftw win GIF.gif" },
  { type: "gif", url: "/media/gifs/Get Out Theatre GIF by Tony Awards.gif" },
  { type: "gif", url: "/media/gifs/go bye bye GIF by Phil Corbett.gif" },
  { type: "gif", url: "/media/gifs/Golden Girls Dancing GIF by TV Land.gif" },
  { type: "gif", url: "/media/gifs/Good Bye GIF (1).gif" },
  
  { type: "gif", url: "/media/gifs/Good Bye GIF.gif" },
  { type: "gif", url: "/media/gifs/Happy Let Go GIF by Jamie N Commons.gif" },
  { type: "gif", url: "/media/gifs/Happy Paul Rudd GIF by NETFLIX.gif" },
  { type: "gif", url: "/media/gifs/Howie Mandel Yes GIF by America's Got Talent.gif" },
  { type: "gif", url: "/media/gifs/Im Out GIF by HockeyDiversityAlliance.gif" },
  { type: "gif", url: "/media/gifs/in your face suck it GIF by Heute-Show.gif" },

// VIDEO

  { type: "video", url: "/media/video/stock-footage-angry-boss.webm" },
  { type: "video", url: "/media/video/stock-footage-bored-male-manger.webm" },
  { type: "video", url: "/media/video/stock-footage-couple-fight.webm" },
  { type: "video", url: "/media/video/stock-footage-crisis-and-stress.webm" }

]

export default function Create() {
  const [tone, setTone] = useState('')
  const [message, setMessage] = useState('')
  const [selectedMedia, setSelectedMedia] = useState(null)

  const handleSubmit = (e) => {
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
      media: selectedMedia, // <-- ajoute le média sélectionné
    }

    localStorage.setItem(`theend-${id}`, JSON.stringify(payload))
    window.location.href = `/end/${id}`
  }

  // 2. Envoi serveur
  fetch('/backend/insert_message.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Serveur:', data)
      // 3. Redirection
      window.location.href = `/end/${id}`
    })
    .catch((err) => {
      console.error('Erreur serveur:', err)
      alert("Une erreur est survenue côté serveur.")
    })
    
  //FORMULAIRE 

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-black to-red-900 text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Crée ta page de départ</h1>

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
          >
            Créer ma page 💥
          </button>
        </form>
      </div>

      <Footer />
    </div>
  )
}

