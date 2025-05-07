import React from 'react';
import { Calendar, MapPin, Award, Briefcase, Code, Palette, LineChart } from 'lucide-react';

const Sobre: React.FC = () => {
  // Dados de experiência profissional
  const experiencias = [
    {
      empresa: "Agência Yuppies" ,
      cargo: "CEO",
      periodo: "Jan 2024 - Atualmente",
      descricao: "Criação de aplicações web completas com React e Node.js. Implementação de APIs RESTful e integração com serviços de terceiros."
    },
    {
      empresa: "Maeztra" ,
      cargo: "Analista de Marketing Senior",
      periodo: "Jun 2021 - Jun 2023",
      descricao: "Desenvolvimento de Site com Wordpress. Execução de campanhas de marketing. Análise de Dados."
    },
    {
      empresa: "DOA COMM" ,
      cargo: "Analista de Performance de Resutados",
      periodo: "Mar 2023",
      descricao: "Gerar relatórios, Google Ads e Meta Ads, Google Analytics, Search Console. Análise de criativos das campanhas digitais."
    },
    {
      empresa: "Maiorino",
      cargo: "Desenvolvedor Full Stack",
      periodo: "Jun 2017 - Jun 2018",
      descricao: "Desenvolvimento de interfaces responsivas e implementação de designs utilizando HTML, CSS e JavaScript."
    },
    {
      empresa: "Cento e Vinte",
      cargo: "Desenvolvedor Wordpress",
      periodo: "Ago 2015 - Jan 2018",
      descricao: "Programação de Sites em Wordpress, mysql, html, css, javascript, php. Customização de plugins e temas."
    },
    {
      empresa: "Startup Inovadora",
      cargo: "Desenvolvedor Front-end Jr.",
      periodo: "2015 - 2017",
      descricao: "Desenvolvimento de interfaces responsivas e implementação de designs utilizando HTML, CSS e JavaScript."
    }
  ];

  // Dados de habilidades
  const habilidades = [
    {
      categoria: "Desenvolvimento Front-end",
      icon: <Code size={24} />,
      skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Next.js"]
    },
    {
      categoria: "Desenvolvimento Back-end",
      icon: <Code size={24} />,
      skills: ["Node.js", "Express", "MongoDB", "MySQL", "RESTful APIs", "Supabase"]
    },
    {
      categoria: "Design",
      icon: <Palette size={24} />,
      skills: ["Figma", "Adobe XD", "UI/UX Design", "Wireframe", "Prototipagem"]
    },
    {
      categoria: "Marketing Digital",
      icon: <LineChart size={24} />,
      skills: ["Fluxos de Automações","Tráfego Pago", "Rd Station", "Email Marketing"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Seção de Perfil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre</h1>
            <p className="text-xl text-gray-400 mb-6">Programador Front-end | Especialista em Low Code e No Code</p>
            
            <p className="text-gray-300  leading-relaxed">
            Sou um profissional apaixonado por criar experiências digitais impactantes, unindo estratégias de marketing eficazes à construção de soluções web inovadoras. Com mais de 8 anos de experiência na indústria digital, minha jornada evoluiu para o desenvolvimento low-code/no-code, utilizando tecnologias avançadas para criar aplicações web ágeis, escaláveis e centradas no usuário.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
            Para otimizar meu tempo e potencializar resultados, integro ferramentas de inteligência artificial ao meu fluxo de trabalho, aumentando a eficiência, a criatividade e a precisão em cada projeto. Minha missão é ajudar empresas a simplificar processos, acelerar o time-to-market e entregar produtos digitais que transformam ideias em soluções de alto impacto e valor.
            </p>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-red-600" size={20} />
                <span>São Paulo, Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-red-600" size={20} />
                <span>Disponível para novos projetos</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-red-600" size={20} />
                <span>8+ anos de experiência</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-red-600">
                <img 
                  src="src/images/take_avatar.jpg"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-black p-3 rounded-full border-2 border-red-600">
                <Briefcase size={28} className="text-red-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Seção de Habilidades */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Minhas Habilidades</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {habilidades.map((categoria, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-red-600">{categoria.icon}</div>
                  <h3 className="text-xl font-semibold">{categoria.categoria}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categoria.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Seção de Experiência */}
        <div>
          <h2 className="text-3xl font-bold mb-12 text-center">Experiência Profissional</h2>
          
          <div className="relative">
            {/* Linha do tempo vertical */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 transform md:translate-x-px"></div>
            
            <div className="space-y-12">
              {experiencias.map((exp, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}>
                  {/* Marcador na linha do tempo */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-red-600 rounded-full transform -translate-x-1.5 md:-translate-x-2 mt-1.5"></div>
                  
                  {/* Conteúdo */}
                  <div className="md:w-1/2 pl-8 md:pl-0 md:pr-12 md:text-right">
                    <h3 className="text-xl font-bold">{exp.empresa}</h3>
                    <p className="text-red-600 font-medium mb-2">{exp.cargo}</p>
                    <p className="text-gray-400 text-sm mb-3">{exp.periodo}</p>
                  </div>
                  
                  <div className={`md:w-1/2 pl-8 ${
                    index % 2 === 0 ? 'md:pl-12 md:pr-0' : 'md:pl-12'
                  }`}>
                    <p className="text-gray-300">{exp.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
