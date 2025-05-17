import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    username: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Ajoutez ici la logique d'envoi du formulaire (par exemple, avec fetch ou axios)
    setSubmitted(true);
  };

  return (


    <div className="contact-form">
        
      <Navbar />

      <h2>Contactez-nous</h2>
      
      {submitted && <p>Merci pour votre message !</p>}
      
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
        
        <button type="submit">Envoyer</button>
      </form>

      <div className="contact-info">
        <p>Pour toute question, vous pouvez nous contacter par e-mail : <a href="mailto:contact@theendpage.com">contact@theendpage.com</a></p>
      </div>
      <Footer />


    </div>

  );
};

export default Contact;
