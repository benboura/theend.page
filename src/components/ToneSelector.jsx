
const tones = [
  'Dramatique',
  'Ironique',
  'Cringe',
  'Classe',
  'Touchant',
  'Absurde',
  'Passif-agressif',
  'Honnête',
]

export default function ToneSelector({ selectedTone, setSelectedTone }) {
  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-2">Choisis ton ton</label>
      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => (
          <button
            key={tone}
            onClick={() => setSelectedTone(tone)}
            className={`px-3 py-2 rounded border transition ${
                selectedTone === tone
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-black border-gray-300 hover:border-black'
            }`}

          >
            {tone}
          </button>
        ))}
      </div>
    </div>
  )
}
