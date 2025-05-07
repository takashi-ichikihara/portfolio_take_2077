
import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Linkedin, Github, Instagram } from 'lucide-react';

const Contato: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { nome, email, assunto, mensagem } = formData;

    // Remover espaços em branco extras
    const nomeFormatado = nome.trim();
    const emailFormatado = email.trim();
    const assuntoFormatado = assunto.trim();
    const mensagemFormatada = mensagem.trim();

    let mensagemWhatsApp = `Nova mensagem do formulário:\n\nNome: ${nomeFormatado}\nEmail: ${emailFormatado}\nAssunto: ${assuntoFormatado}\nMensagem: ${mensagemFormatada}`;

    // Remover %0a%0
    mensagemWhatsApp = mensagemWhatsApp.replace(/%0a%0/g, "");

    const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);

    const urlWhatsApp = `https://wa.me/5511960284036?text=${mensagemCodificada}`;

    window.open(urlWhatsApp, '_blank');
};

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-xl text-gray-400">
            Tem um projeto e não sabe como criar o modelo de negócio pra ele?
          </p>
          <p className="text-xl text-gray-400"> Vamos conversar sobre como posso ajudar a transformar esse seu sonho em realidade.</p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-12">
          {/* Informações de Contato */}
          

          {/* Formulário de Contato */}
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Envie uma mensagem</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-medium mb-2">
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="Projeto Web">Projeto Web</option>
                  <option value="Projeto Mobile">Projeto Mobile</option>
                  <option value="Consultoria">Consultoria</option>
                  <option value="Parceria">Parceria</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Send size={18} />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;
