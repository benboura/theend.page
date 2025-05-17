import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Contact from './Contact';
import Create from './Create'; // Composant pour la création
import Gallery from './Gallery'; // Composant pour la galerie
import Connexion from './Connexion'; // Composant pour la connexion
import Inscription from './Inscription'; // Composant pour l'inscription

export default function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col items-center justify-center text-center bg-black text-white">
        <Navbar />

        <h1 className="text-5xl font-bold mb-4">TheEnd.Page</h1>
        <p className="mb-6">Crée ta page de départ… avec style.</p>

        <Link
          to="/create"
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Commencer
        </Link>

        {/* Configuration des routes */}
        <Switch>
          <Route path="/create" component={Create} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/connexion" component={Connexion} />
          <Route path="/inscription" component={Inscription} />
          <Route path="/contact" component={Contact} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

