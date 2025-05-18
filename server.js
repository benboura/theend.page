require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Client } = require('pg');

const app = express();
app.use(cors()); // Autoriser les requêtes cross-origin (React → Express)
app.use(express.json());

// Connexion à PostgreSQL via Supabase
const client = new Client({
  connectionString: process.env.DB_URL,
});

// Se connecter à la base de données
client.connect()
  .then(() => {
    console.log("✅ Connexion réussie à la base de données PostgreSQL sur Supabase");
  })
  .catch(err => {
    console.error("❌ Erreur de connexion à Supabase", err);
    process.exit(1); // Stop le serveur si la base est inaccessible
  });

// Test de la connexion (facultatif)
client.query('SELECT NOW()')
  .then(res => {
    console.log('🕒 Horodatage actuel:', res.rows[0]);
  })
  .catch(err => {
    console.error('❌ Erreur lors de la requête de test:', err);
  });

// ROUTES

// 🖼️ Liste des pages
app.get('/api/gallery', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM end_pages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur dans /api/gallery :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 💬 Créer une nouvelle page
app.post('/api/create', async (req, res) => {
  const { id, tone, message, media } = req.body;

  if (!id || !tone || !message || !media) {
    return res.status(400).json({ error: 'Champs manquants.' });
  }

  try {
    await client.query(
      'INSERT INTO end_pages (id, tone, message, image_url) VALUES ($1, $2, $3, $4)',
      [id, tone, message, media]
    );   b

    res.status(201).json({ message: 'Page créée avec succès.' });
  } catch (err) {
    console.error("❌ Erreur lors de l'insertion dans la base :", err);
    res.status(500).json({ error: 'Erreur serveur lors de l\'insertion.' });
  }
});

// 📇 Liste des contacts (optionnel)
app.get('/api/contact', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM contact');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur dans /api/contact :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// 🔈 Test
app.get('/api/', (req, res) => {
  res.json({ message: "API theend opérationnelle 🚀" });

});

// 🚀 Lancer le serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Le serveur écoute sur le port ${port}`);
});

// 🧼 Fermer la connexion proprement si le serveur s'arrête
process.on('exit', () => {
  client.end();
});



// 🔍 Obtenir une page par ID
app.get('/api/page/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query('SELECT * FROM end_pages WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page non trouvée' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erreur dans /api/page/:id :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Inscription

router.post('/api/inscription', async (req, res) => {
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const email = req.body.email;
  const mot_de_passe = req.body.mot_de_passe;


  if (!prenom || !nom || !email || !mot_de_passe) {
    return res.status(400).json({ message: 'Champs manquants.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const connection = await mysql.createConnection(dbConfig);

    // Vérifier si l'email existe déjà
    const [rows] = await connection.execute(
      'SELECT id FROM utilisateurs WHERE email = ?',
      [email]
    );

    if (rows.length > 0) {
      await connection.end();
      return res.status(409).json({ message: 'Email déjà utilisé.' });
    }

    // Insertion
    await connection.execute(
      `INSERT INTO utilisateurs (prenom, nom, email, mot_de_passe)
       VALUES (?, ?, ?, ?)`,
      [prenom, nom, email, hashedPassword]
    );

    await connection.end();
    res.status(201).json({ message: 'Utilisateur ajouté avec succès.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Connexion

router.post('/api/connexion', async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res.status(400).json({ message: 'Champs manquants.' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT * FROM utilisateurs WHERE email = ?',
      [email]
    );

    await connection.end();

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const utilisateur = rows[0];
    const match = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);

    if (!match) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Tu peux ici générer un token si tu veux (JWT par exemple)
    res.status(200).json({ message: 'Connexion réussie.', utilisateur: {
      id: utilisateur.id,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      email: utilisateur.email,
    }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;