import { useState } from 'react';
import { supabase } from '../supabase';

export default function Inscription() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nom } }
    });

    if (error) return alert('Erreur: ' + error.message);
    alert('Compte créé avec succès. Vérifie ton email.');
    window.location.href = '/connexion';
  };

  return (
    <form
      onSubmit={handleSignup}
      className="space-y-4 max-w-sm mx-auto mt-10 bg-black p-6 rounded"
    >
      <h2 className="text-white text-xl mb-4 font-bold text-center">Inscription</h2>
      <input
        value={nom}
        onChange={e => setNom(e.target.value)}
        className="w-full p-2 rounded bg-white text-black"
        placeholder="Ton nom complet"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-white text-black"
        placeholder="ex : nom@mail.com"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-white text-black"
        placeholder="Mot de passe"
      />
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded"
      >
        Créer un compte
      </button>
    </form>
  );
}

