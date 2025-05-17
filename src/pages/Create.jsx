
import { useState } from 'react'
import ToneSelector from '../components/ToneSelector'

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

export default function Create() {
  const [tone, setTone] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!tone || !message.trim()) {
      alert('Complète tous les champs !')
      return
    }

    const id = crypto.randomUUID()
    const payload = { id, tone, message }
    localStorage.setItem(`theend-${id}`, JSON.stringify(payload))
    window.location.href = `/end/${id}`
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-black to-red-900 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Créer ta page de départ</h1>

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

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
          >
            Générer ma page 💥
          </button>
        </form>
      </div>
    </div>
  )
}
