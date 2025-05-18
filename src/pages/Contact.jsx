import { useState } from "react";
import { supabase } from "../supabase";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nom, email, message } = form;
    if (!nom || !email || !message) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    setSending(true);

    const { error } = await supabase.from("contact").insert([
      {
        id: crypto.randomUUID(),
        nom,
        email,
        message,
      },
    ]);

    setSending(false);

    if (error) {
      alert("Erreur Supabase : " + error.message);
    } else {
      alert("Message bien envoyé !");
      setForm({ nom: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Contact</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nom"
            type="text"
            placeholder="Ton nom"
            className="w-full p-3 rounded text-black"
            value={form.nom}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Ton email"
            className="w-full p-3 rounded text-black"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Ton message"
            className="w-full p-3 rounded text-black"
            rows={5}
            value={form.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition"
            disabled={sending}
          >
            {sending ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
