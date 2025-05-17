const express = require('express');
// const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'UTILISATEUR_MYSQL',
  password: 'MDP_MYSQL',
  database: 'NOM_BDD'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur MySQL :', err);
    return;
  }
  console.log('✅ Connecté à MySQL');
});

// Route POST
app.post('/api/message', (req, res) => {
  const { tone, message } = req.body;
  const sql = 'INSERT INTO messages (tone, message) VALUES (?, ?)';

  db.query(sql, [tone, message], (err, result) => {
    if (err) {
      console.error('Erreur SQL :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    res.json({ success: true, id: result.insertId });
  });
});

// 🔥 Démarrer serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API en ligne sur le port ${PORT}`));
