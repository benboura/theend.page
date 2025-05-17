import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function View() {
    const { id } = useParams()
    const [data, setData] = useState(null)

    useEffect(() => {
        const stored = localStorage.getItem(`theend-${id}`)
        if (stored) {
            setData(JSON.parse(stored))
        }
    }, [id])

    if (!data) {
        return (
            <div className="h-screen flex items-center justify-center text-white bg-black">
                <p>Page de départ introuvable 🪦</p>
            </div>
        )
    }

    const toneStyles = {
        'Dramatique': 'bg-black text-red-500 italic animate-pulse',
        'Ironique': 'bg-yellow-100 text-pink-600 font-mono',
        'Cringe': 'bg-purple-900 text-green-300 underline',
        'Classe': 'bg-white text-black font-serif shadow-2xl',
        'Touchant': 'bg-blue-100 text-blue-900 font-light',
        'Absurde': 'bg-gradient-to-br from-pink-400 to-green-400 rotate-1',
        'Passif-agressif': 'bg-gray-800 text-gray-300 line-through',
        'Honnête': 'bg-slate-100 text-black font-normal',
    }

    const toneGifs = {
        'Dramatique': 'https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif',
        'Ironique': 'https://media.giphy.com/media/jUwpNzg9IcyrK/giphy.gif',
        'Cringe': 'https://media.giphy.com/media/l2JhGxFfl7O7B8FLO/giphy.gif',
        'Classe': 'https://media.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy.gif',
        'Touchant': 'https://media.giphy.com/media/ZqlvCTNHpqrio/giphy.gif',
        'Absurde': 'https://media.giphy.com/media/l0Iya3CQbV0Z6TnO8/giphy.gif',
        'Passif-agressif': 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif',
        'Honnête': 'https://media.giphy.com/media/Wn74RUT0vjnoU98Hnt/giphy.gif',
    }

    const toneAudios = {
        'Dramatique': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'Ironique': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        'Cringe': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        'Classe': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        'Touchant': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        'Absurde': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        'Passif-agressif': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        'Honnête': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    }

    return (
        <div className={`min-h-screen flex items-center justify-center p-8 ${toneStyles[data.tone] || 'bg-white text-black'}`}>
            <div className="max-w-2xl text-center space-y-6">
                <h1 className="text-3xl font-bold">Voici son dernier mot...</h1>
                <img src={toneGifs[data.tone]} alt="gif" className="mx-auto max-w-xs rounded-lg shadow-lg" />
                <audio controls autoPlay loop src={toneAudios[data.tone]} className="mx-auto mt-4" />
                <div className="whitespace-pre-wrap text-xl mt-4">{data.message}</div>
                <p className="mt-10 text-sm opacity-70">Partagé via <strong>TheEnd.page</strong> — {data.tone}</p>
                <div className="mt-6 space-y-4">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href)
                            alert("Lien copié 📎")
                        }}
                        className="px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-200 transition"
                    >
                        Copier le lien
                    </button>
                </div>
            </div>
        </div>
    )
}
