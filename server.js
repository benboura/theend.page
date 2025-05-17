require('dotenv').config();
const express = require('express');
const { Client } = require('pg');

const app = express(); // ✅ d'abord on crée l'app

app.use(express.json()); // ✅ ensuite on peut utiliser app

// le reste du code...

// Créer une instance du client PostgreSQL avec l'URL de la base de données
const client = new Client({
  connectionString: process.env.DB_URL, // URL de connexion à la base de données via .env
});

// Se connecter à la base de données
client.connect()
  .then(() => {
    console.log("Connexion réussie à la base de données PostgreSQL sur Supabase");
  })
  .catch(err => {
    console.error("Erreur de connexion à Supabase", err);
  });

// Exemple de requête pour tester la connexion
client.query('SELECT NOW()') // On demande la date et l'heure actuelles à PostgreSQL
  .then(res => {
    console.log('Horodatage actuel:', res.rows[0]);
  })
  .catch(err => {
    console.error('Erreur lors de la requête:', err);
  });

// // Définir une route principale pour tester le serveur
// app.get('/', (req, res) => {
//   res.send('Bienvenue sur le serveur Express connecté à Supabase !');
// });

app.get('/api/gallery', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM pages'); // remplace "pages" par le nom de ta table
    res.json(result.rows); // envoie les données au frontend
  } catch (err) {
    console.error('Erreur dans /api/gallery :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.use(express.json()); // important pour lire le body JSON

app.post('/api/create', async (req, res) => {
  const { id, tone, message, media } = req.body;

  if (!id || !tone || !message) {
    return res.status(400).json({ error: 'Champs manquants.' });
  }

  try {
    await client.query(
      'INSERT INTO end_pages (id, utilisateur_id, title, image_url, message, categorie, tone, gif_url, video_url) VALUES ($1, $2, $3, $4)',
      [id, tone, message, media]
    );

    res.status(201).json({ message: 'Message enregistré avec succès.' });
  } catch (err) {
    console.error('Erreur lors de l\'insertion dans la base :', err);
    res.status(500).json({ error: 'Erreur serveur lors de l\'insertion.' });
  }
});


app.get('/api/contact', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM contact'); // remplace "pages" par le nom de ta table
    res.json(result.rows); // envoie les données au frontend
  } catch (err) {
    console.error('Erreur dans /api/contact :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/', async (req, res) => {
  // try {
  //   const result = await client.query('SELECT * FROM pages'); // remplace "pages" par le nom de ta table
  //   res.json(result.rows); // envoie les données au frontend
  // } catch (err) {
  //   console.error('Erreur dans /api/gallery :', err);
  //   res.status(500).json({ error: 'Erreur serveur' });
  // }
});

// Démarrer le serveur HTTP sur le port 3001
const port = process.env.PORT || 3001; // Utilisation de la variable d'environnement PORT si définie, sinon port 3000
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

// Fermer la connexion à la base de données lorsque le serveur se termine
process.on('exit', () => {
  client.end();
});

