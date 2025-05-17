
import { Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-4">TheEnd.page</h1>
      <p className="mb-6">Crée ta page de départ… avec style.</p>
      <Link
        to="/create"
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
      >
        Commencer
      </Link>
    </div>
  )
}
