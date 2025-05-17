
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Gallery() {
    const [pages, setPages] = useState([])

    useEffect(() => {
        const entries = Object.entries(localStorage)
            .filter(([key]) => key.startsWith('theend-'))
            .map(([key, value]) => JSON.parse(value))
        setPages(entries)
    }, [])

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
    )
}
