import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Contact from './Contact';
import Create from './Create'; 
import Gallery from './Gallery';
import Connexion from './Connexion'; 
import Inscription from './Inscription'; 
import axios from 'axios'; // Pour récupérer les posts

export default function App() {
  const [posts, setPosts] = useState([
    // 1. Démissionner de son travail
    {
      id: 1,
      title: "J'AI QUITTE MON JOB DE RÊVE ET JE NE LE REGRETTE PAS ",
      description: "Il y a quelques années, j'ai décroché ce qui semblait être le job de mes rêves. Un salaire confortable, une entreprise réputée, des collègues sympas... Tout paraissait parfait. Mais petit à petit, la réalité a commencé à me rattraper."

`Je me suis retrouvé à sacrifier des heures de sommeil, des week-ends et même des relations pour un job qui, au fond, ne me faisait plus vibrer. L'adrénaline des premiers mois a laissé place à une routine épuisante, un stress constant, et une sensation de burn-out qui ma fait me poser les bonnes questions.

Pourquoi continuer dans un travail qui me grignote de l'intérieur, juste pour un salaire ou une image ? La vérité, c est qu aucun job ne vaut la peine de sacrifier sa santé, sa liberté ou son bonheur.

Alors, jai pris la décision la plus difficile de ma vie : j'ai quitté mon job de rêve. Cela a été un saut dans linconnu, mais un saut libérateur.

Aujourdhui, je me réinvente. Je travaille sur des projets qui me passionnent, j'ai retrouvé un équilibre de vie, et surtout, je n'ai jamais été aussi heureux.

Ne laissez pas la peur vous retenir dans un job qui ne vous correspond plus. Parfois, la meilleure chose que vous puissiez faire pour vous-même, c'est de tout lâcher pour trouver ce qui vous fait vraiment vivre.

Si vous êtes dans cette situation, sachez que vous méritez d'être épanoui. Osez franchir le pas ! 🚀`,

      likes: 0,
      gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnI5NGxvd2l2aWhmMGQwZWNuOGljN205YjlyOWx3emJ0a2Zqd3lsciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bFUgKXfi5IAiOhLIXm/giphy.gif"
    },
    {
      id: 2,
      title: "Le jour où j'ai dit adieu à un patron toxique",
      description: `Travailler pour un patron toxique, c’est comme être constamment sous pression, sans avoir de moyen de respirer. Pendant des mois, j'ai enduré les critiques incessantes, les attentes irréalistes, et le manque total de reconnaissance.

    Ce qui a commencé comme une simple frustration s’est transformé en un stress insupportable. À force de me sentir rabaissé à chaque réunion, de voir des collègues partir sous pression, j’ai réalisé que cette situation était devenue bien trop malsaine pour ma santé mentale et physique.

    Le jour où j'ai dit "adieu" à ce patron toxique, c'était comme si un poids énorme venait d'être levé. Je me suis rendu compte que l’entreprise, aussi grande soit-elle, n’allait pas me protéger de la toxicité d’un seul individu. 

    Dire "non" à un environnement de travail toxique a été un acte de courage. C’était difficile, mais nécessaire. Depuis, ma vie a changé. J'ai trouvé un job dans une entreprise où la bienveillance, le respect et la reconnaissance sont au cœur de la culture. J’ai retrouvé la paix d’esprit et je ne reviendrais jamais en arrière.

    Si tu te reconnais dans cette situation, sache qu'il est possible de quitter un environnement toxique et de retrouver ta liberté et ton épanouissement. Ne laisse personne te dicter ta valeur. Tu mérites mieux. 🌟`,
  
      likes: 0,
      gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3FmMzRodWhuZGx2bXp1eWJzcmQ3emJwd3BzOGdnMDhrOHZjbHloMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VDYAkBufqnir8n4Ddf/giphy.gif"
    },

    // 2. Rupture amoureuse
    {
      id: 3,
      title: "J'ai décidé de tourner la page",
      description:` Il y a des moments dans la vie où tu te rends compte qu'il est temps de tourner la page. J'avais traversé une rupture difficile, une période de remise en question, et je me sentais perdu. Mais un jour, après de nombreuses larmes et discussions, j'ai compris que pour avancer, je devais vraiment tourner la page.

    Tourner la page, ce n’est pas juste oublier ce qui s'est passé. C'est accepter ce qui a été, mais ne plus laisser cela définir ton futur. C’est comprendre que la fin d’un chapitre, qu'il soit une relation, une situation de travail ou même une phase de vie, peut en réalité être le début d’une nouvelle aventure.

    J'ai appris à me redécouvrir, à reprendre confiance en moi, et surtout à me pardonner pour ce que je croyais être des échecs. Le plus beau dans tout ça ? J'ai enfin réalisé qu'il n'y a pas d'échec, seulement des étapes d'apprentissage.

    Si toi aussi, tu as l'impression d'être coincé dans une situation qui te pèse, rappelle-toi qu'il est possible de tourner la page. Cela demande du temps, de la patience et, parfois, de la souffrance, mais ça en vaut la peine. N'aie pas peur de dire au revoir pour accueillir ce qui t'attend de mieux. 🌟`,
      likes: 0,
      gif: "/https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWxsY2J4cGNpaHhpbncxY3oyMDVxdzd2ZHpyc3lhb3Y1OTVraWcwNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ckGndVa23sCk9pae4l/giphy.gif"
    },
    {
      id: 4,
      title: "J'ai rompu en toute bienveillance",
      description: `Rompre n’est jamais facile, mais cela peut être fait dans le respect et la compréhension mutuelle. En choisissant de rompre en toute bienveillance, je peux préserver mon estime de moi et celle de l'autre. La clé est de voir cette rupture comme une étape de croissance pour tous les deux, permettant à chacun de se reconstruire et d’avancer vers de nouveaux horizons.`,
      likes: 0,
      gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTZ1ZWg5OThrZjdzbTAzZDB1bDlvY2RoNjBoNDNveTdyN20xNXE5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Me0gDbCgNK9VXPk0HZ/giphy.gif"
    },

    // 3. Déménagement et nouveau départ
    {
      id: 5,
      title: "Je quitte mon village pour une nouvelle vie à la ville",
      description: `Je quitte mon village pour une nouvelle vie en ville parce que je ressens le besoin de découvrir de nouvelles opportunités. Après un certain temps dans son environnement familier, je me rend compte qu'elle souhaite sortir de sa zone de confort pour vivre quelque chose de différent. La ville lui offre plus de possibilités, de rencontres, et de nouvelles expériences, alors elle décide de se lancer dans cette aventure pour s'épanouir et grandir.`,
      likes: 0,
      gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmU1eTZod3VnOGh0c3NrYnBvcG5weno4Z2ZmbnkwbjFpcGw4ajlmdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IrFX2QzXGfD8vgeP84/giphy.gif"
    },

    // 4. Changer de vie / Prendre un nouveau départ
    {
      id: 6,
      title: "Je sort ENFIN d'une relation toxique",
      description: `Je sort enfin d'une relation toxique après avoir longtemps vécu dans un environnement où je me sentait épuisé, malheureux et parfois même dévalorisé. Au début, elle n'a pas osé prendre la décision, par peur de l'inconnu ou de la douleur que cela pourrait engendrer. Mais avec le temps, elle a réalisé que rester dans cette relation la freinait, qu'elle méritait mieux et que j'avais
       le droit de me reconstruire. Aujourd'hui, je suis prêt à me libérer, à guérir, et à me retrouver. Quitter cette relation est la première étape vers un futur où je peux enfin être moi-même, sans les chaînes du passé.`,
      likes: 0,
      gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTd5NmNsYTRscTJmdTcwZ3ZhMW4xZ3poeWh1bWRxamZrYTN0bjI4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L7FFjUkKOnuKEFt4Iy/giphy.gif"
    },
    {
      id: 7,
      title: "Je quitte mon job, ma relation et ma ville",
      description: `J'ai pris la décision de quitter mon job, ma relation et ma ville, bref tout. Un changement radical que je n’ai pas pris à la légère. Après avoir longtemps ressenti que j'étais coincée dans des situations qui ne me rendaient pas heureuse, j'ai enfin pris le courage de tout remettre en question. Mon travail ne l’épanouissait plus, ma relation l’étouffait et sa ville n'offrait plus de nouvelles perspectives. J'avais compris que pour avancer, il fallait se libérer de ce qui me retenait. Aujourd’hui, je ne regrette absolument pas ma décision, car j'ai retrouvé sa liberté et je suis prête à écrire un nouveau chapitre de ma vie, plus aligné avec mes désirs et mes rêves.`,
      likes: 0,
      gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjV3b2twN2NweGtrdThxand5cXJydXFjcXV0Zzhobm5qc3hpaGVraCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BjLMjmjkgKyz44ZN8q/giphy.gif"
    },
    {
      id: 8,
      title: "Pourquoi la fin d'une étape est en réalité un nouveau commencement",
      description: `Ne restez pas ou vous n'êtes pas accepté. La fin d'une étape est en réalité un nouveau commencement, car chaque fin porte en elle la promesse d’un renouveau. Parfois, on reste attaché à ce qui est familier, même si cela ne nous sert plus, simplement par peur de l'inconnu. Mais au moment où l’on ferme une porte, on ouvre en fait plusieurs autres, souvent bien plus grandes que celles que l’on venait de quitter. La fin marque un point de transition, une opportunité de se réinventer, d’aller vers ce que l’on mérite vraiment, sans les poids du passé. C’est en lâchant prise que l’on peut avancer vers des horizons plus vastes et plus lumineux. À bon entendeur.`
,
      likes: 0,
      gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWowMGxzbmJvZTc5eHdkMWRnYnh3cW5zamxnNThtOTlnbTlkeDhzbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n5NdN2msH3bpR8m5vS/giphy.gif"
    },
  ]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // Fonction pour gérer le clic sur le bouton "like"
  const handleLike = (id) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

console.log(posts);

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

        {/* Afficher les posts populaires uniquement sur la page d'accueil */}
        <div className="mt-8 w-full max-w-xl">
          <h2 className="text-3xl mb-4">Posts Populaires</h2>
          {loading && <div>Chargement des posts...</div>}
          {error && <div>{error}</div>}
          <ul className="space-y-4">
            {posts.slice(0, 5).map((post) => ( // Afficher les 5 posts les plus populaires
              <li key={post.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p>{post.description}</p>

                {/* Affichage du gif */}
                <div className="mt-4">
                  <img src={post.gif} alt={post.title} className="w-full rounded-md" />
                </div>

                {/* Bouton Like et affichage des likes */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg">Likes: {post.likes}</span>
                  <button
                    onClick={() => handleLike(post.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                  >
                    J'aime
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

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