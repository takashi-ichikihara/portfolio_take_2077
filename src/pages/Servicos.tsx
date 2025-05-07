import React from 'react';
import { Code, Palette, LineChart } from 'lucide-react';

interface ServicoProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServicoCard: React.FC<ServicoProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg hover:bg-zinc-800 transition-colors group">
      <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Servicos: React.FC = () => {
  const servicos = [
    {
      icon: <Code size={48} />,
      title: "Desenvolvimento Web",
      description: "Criação de sites responsivos, landing pages e aplicações web utilizando as tecnologias mais modernas como React, Next.js e Tailwind CSS."
    },
    {
      icon: <Palette size={48} />,
      title: "UI/UX Design",
      description: "Design de interfaces intuitivas e experiências de usuário que combinam estética e funcionalidade para criar produtos digitais impactantes."
    },
    {
      icon: <LineChart size={48} />,
      title: "Marketing Digital",
      description: "Estratégias de marketing digital personalizadas, incluindo SEO, gestão de redes sociais e campanhas de anúncios para aumentar sua presença online."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meus Serviços</h1>
          <p className="text-xl text-gray-400">
            Ofereço soluções digitais completas para transformar suas ideias em realidade.
            Cada serviço é personalizado para atender às necessidades específicas do seu projeto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((servico, index) => (
            <ServicoCard
              key={index}
              icon={servico.icon}
              title={servico.title}
              description={servico.description}
            />
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Precisa de um serviço personalizado?</h2>
          <p className="text-gray-400 mb-8">
            Entre em contato para discutirmos como posso ajudar no seu projeto específico.
            Estou disponível para trabalhos freelance e parcerias de longo prazo.
          </p>
          <a 
            href="/contato" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md transition-colors"
          >
            Fale Comigo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Servicos;
