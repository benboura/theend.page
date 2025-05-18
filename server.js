require('dotenv').config();
const express = require('express');
const cors = require('cors');
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
<<<<<<< HEAD
 
app.get('/api/', async (req, res) => {
  // try {
  //   const result = await client.query('SELECT * FROM pages'); // remplace "pages" par le nom de ta table
  //   res.json(result.rows); // envoie les données au frontend
  // } catch (err) {
  //   console.error('Erreur dans /api/gallery :', err);
  //   res.status(500).json({ error: 'Erreur serveur' });
  // }
=======

// 🔈 Test
app.get('/api/', (req, res) => {
  res.json({ message: "API theend opérationnelle 🚀" });
>>>>>>> 2925ca233db84dd6d861eda709a642bf49cbfd2e
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
