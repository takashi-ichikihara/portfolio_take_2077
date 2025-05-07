import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  image: string;
  category: string;
  client: string;
  description: string;
  role: string;
  year: number;
  technologies: string[];
  detailImages: string[];
  created_at: string;
}

const Home: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [typedText2, setTypedText2] = useState(''); // Novo estado para a segunda frase
  const fullText = "Hey, Seja Bem-vindo ao meu portfolio!";
  const fullText2 = "Programador Front-end | Especialista em Low Code e No Code"; // Segunda frase
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let i = 0;
    let j = 0; // Contador para a segunda frase
    let typingInterval: NodeJS.Timeout;
    let loopTimeout: NodeJS.Timeout;

    const startTyping = () => {
      setTypedText(''); // Limpa o texto da primeira frase
      setTypedText2(''); // Limpa o texto da segunda frase
      i = 0;
      j = 0;

      // Digita a primeira frase
      typingInterval = setInterval(() => {
        setTypedText(fullText.substring(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(typingInterval);
          // Começa a digitar a segunda frase após a primeira terminar
          typingInterval = setInterval(() => {
            setTypedText2(fullText2.substring(0, j + 1));
            j++;
            if (j === fullText2.length) {
              clearInterval(typingInterval);
              // Configura o timeout para reiniciar o loop após 6 segundos
              loopTimeout = setTimeout(startTyping, 6000); // 6000ms = 6 segundos
            }
          }, 30); // Ajuste a velocidade da segunda frase aqui (pode ser diferente)
        }
      }, 50); // Ajuste a velocidade da primeira frase aqui
    };

    startTyping(); // Inicia o primeiro ciclo de digitação

    // Limpar intervalos e timeouts quando o componente for desmontado
    return () => {
      clearInterval(typingInterval);
      clearTimeout(loopTimeout);
    };
  }, [fullText]); // Adicionado fullText como dependência, embora seja constante

  // Estados para o "arrastar para rolar"
  const [isDragging, setIsDragging] = useState(false);
  console.log("Componente Home renderizado"); // Adicionado console.log
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  useEffect(() => {
    console.log("useEffect em Home executado"); // Log no início do useEffect
    const fetchProjects = async () => {
      console.log("fetchProjects iniciado"); // Log no início da função assíncrona
      setLoading(true);
      try {
        console.log("Chamando Supabase para buscar cases..."); // Log antes da chamada ao Supabase
        const { data, error } = await supabase
          .from('cases')
          .select('*')
          .order('created_at', { ascending: false });

        console.log("Resposta do Supabase recebida."); // Log após a resposta do Supabase

        if (error) {
          console.error('Erro ao buscar os cases:', error);
          alert('Erro ao carregar os cases.');
        }
        if (data) {
          setProjects(data as Project[]);
          console.log("Cases buscados (dados):", data); // Log dos dados buscados
        } else {
          console.log("Nenhum dado retornado do Supabase."); // Log se nenhum dado for retornado
        }
      } catch (error) {
        console.error('Erro na execução da busca:', error); // Log para erros na execução da promise
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("Ocorreu um erro desconhecido durante a busca.");
        }
      } finally {
        setLoading(false);
        console.log("fetchProjects finalizado. Loading:", false); // Log no finally
      }
    };

    fetchProjects();
  }, []); // Dependências vazias para executar apenas uma vez ao montar

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 800;
      const newPosition = direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth,
          scrollPosition + scrollAmount
        );

      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  // Funções para lidar com o "arrastar para rolar"
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current!.offsetLeft);
    setScrollLeftStart(carouselRef.current!.scrollLeft);
    carouselRef.current!.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    carouselRef.current!.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current!.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current!.offsetLeft;
    const walk = (x - startX) * 1; // Ajuste a velocidade de rolagem
    carouselRef.current!.scrollLeft = scrollLeftStart - walk;
  };


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div
        className="relative h-screen flex items-center"
      >
        <video src="/video-h1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        {/* Conteúdo movido para dentro do container do vídeo */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-left bg-black/50"> {/* Adicionado overlay e centralização */}
          <div className="container mx-auto px-6 p-3">
            <h2 className="text-5xl md:text-5xl font-bold mb-4" id="typewriter">{typedText}</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">{typedText2}</p> {/* Usar typedText2 aqui */}
            <button
              onClick={() => navigate('/cases')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md flex items-center gap-2"
            >
              <Play size={20} />
              Principais Cases
            </button>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="py-16">
        {loading ? (
          <p>Carregando cases...</p>
        ) : (
          <>
            <div className="container mx-auto px-6 py-6">
              <h3 className="text-4xl font-bold mb-6">Projetos Recentes</h3>
            </div>
            <div className="relative group">
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={24} />
              </button>

              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-hidden px-6 scroll-smooth cursor-grab select-none"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="flex-none w-96"
                  >
                    <div className="group/card relative overflow-hidden rounded-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-[300px] object-cover transform group-hover/card:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h4 className="text-xl font-bold">{project.title}</h4>
                        <p className="text-sm text-gray-300">{project.category}</p>
                        <button
                          onClick={() => navigate(`/project/${project.id}`)}
                          className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 w-fit"
                        >
                          <ExternalLink size={16} />
                          Veja o Projeto em detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Skills Section */}
      <div className="py-6">
        <div className="container mx-auto px-6 py-6 text-left">
          <h3 className="text-2xl font-bold mb-6">Habilidades Técnicas | Ferramentas para desenvolvimento web</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          
              {/* Desenvolvimento Front-end */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <span className="text-red-500 mr-2"></span>
                <h4 className="text-xl font-semibold">Desenvolvimento Front-end</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">React</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">TypeScript</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Next.js</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">JavaScript</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">HTML5</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">CSS3</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Bootstrap</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Framer</span>
              </div>
            </div>

            {/* Desenvolvimento Back-end */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <span className="text-red-500 mr-2"></span>
                <h4 className="text-xl font-semibold">Desenvolvimento Back-end</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">MySQL</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Firebase</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">MongoDB</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Supabase</span>
              </div>
            </div>

            {/* Design */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <h4 className="text-xl font-semibold">Design UI/UX</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Figma</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Adobe XD</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Wireframe</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Prototipagem</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Adobe Photoshop</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Ilustrator</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Canvas</span>
              </div>
            </div>

            {/* Marketing Digital */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <h4 className="text-xl font-semibold">Marketing Digital</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">SEO</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Google Analytics</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Email Marketing</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Mídias Sociais</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Copywriting</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <h4 className="text-xl font-semibold">Ferramentas de IA </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Lovable</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">N8N</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">HuggingFace</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">ElevenLabs</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Kling AI</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Leonardo AI</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Ideogram</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <h4 className="text-xl font-semibold">Edição de Videos</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Capcut Pro</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Adobe Premiere</span>
              </div>
            </div>


          </div>
        </div>
      </div>


{/* Hard skilss */}
  <div className="bg-black py-6">
        <div className="container mx-auto px-6 py-6 text-left">
          <h3 className="text-2xl font-bold mb-6 text-white">Habilidades Comportamentais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
    
            {/* Marketing Digital */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <h4 className="text-xl font-semibold">Interpessoais</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Comunicação clara e eficaz</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Empatia </span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Capacidade de dar e receber feedback construtivo</span>
              </div>
            </div>


            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <h4 className="text-xl font-semibold">Trabalho em Equipe</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Colaboração e trabalho em equipe</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Mediação e resolução de conflitos</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Motivação de colegas e equipes</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Adaptabilidade em dinâmicas de grupo</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <h4 className="text-xl font-semibold">Gestão Pessoal</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Organização e gerenciamento de tempo</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Capacidade de trabalhar sob pressão</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Autogestão e disciplina</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Resiliência e capacidade de lidar com fracassos ou adversidades</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Flexibilidade e abertura para mudanças</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <h4 className="text-xl font-semibold">Criativas</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Pensamento crítico e resolução de problemas</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Curiosidade e mentalidade de crescimento</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">Proatividade e iniciativa</span>
              </div>
            </div>


            

          </div>
        </div>
      </div>

      


    </div>
  );
};

export default Home;
