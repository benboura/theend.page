export default function Connexion() {
  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded shadow text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            placeholder="ex: nom@mail.com"
          />
        </div>
        <div>
          <label className="block mb-1">Mot de passe</label>
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
