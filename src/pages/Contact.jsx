import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    username: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Pour afficher un état de chargement
  const [error, setError] = useState(null); // Pour afficher les erreurs éventuelles

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Envoi du formulaire à l'API avec fetch (URL de ton backend)
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envoie les données du formulaire
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }

      setSubmitted(true); // Si l'envoi est réussi, on met submitted à true
      setFormData({ username: '', message: '' }); // Réinitialise le formulaire
    } catch (err) {
      setError(err.message); // Si une erreur survient, on l'affiche
    } finally {
      setLoading(false); // On arrête le chargement
    }
  };

  return (
    <div className="contact-form">
      <Navbar />

      <h2>Contactez-nous</h2>

      {submitted && <p>Merci pour votre message !</p>}
      {error && <p className="text-red-500">Erreur: {error}</p>} {/* Affichage de l'erreur */}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>

      <div className="contact-info">
        <p>Pour toute question, vous pouvez nous contacter par e-mail : <a href="mailto:contact@theendpage.com">contact@theendpage.com</a></p>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
