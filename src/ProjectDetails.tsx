import { useEffect, useState } from 'react';
import { ArrowLeft, Heart, Smile } from 'lucide-react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

interface Project {
  id: string;
  image: string;
  title: string;
  category: string;
  client: string;
  description: string;
  role: string;
  year: string;
  technologies: string[];
  detailImages: string[];
  githubUrl?: string;
  liveUrl?: string;
  video?: string; // Adicionado campo opcional para vídeo
}

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0); // Novo estado para contagem de curtidas
  const [videoLoading, setVideoLoading] = useState(true); // Novo estado para carregamento do vídeo

  // Função para atualizar curtidas no banco de dados
  const updateLikes = async (liked: boolean, count: number) => {
    if (!id) return;

    const { error } = await supabase
      .from('cases')
      .update({ isLiked: liked, likesCount: count })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar curtidas:', error);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setError("ID do projeto não fornecido.");
        setLoading(false);
        return;
      }

      console.log("Buscando projeto com ID:", id); // Adicionado console.log

      const { data, error } = await supabase
        .from('cases')
        .select('*, isLiked, likesCount') // Incluir isLiked e likesCount na busca
        .eq('id', id);

      if (error) {
        console.error('Erro ao buscar o projeto:', error);
        setError("Erro ao carregar o projeto.");
      } else if (data && data.length > 0) {
        const projectData = data[0];
        setProject(projectData);
        setIsLiked(projectData.isLiked || false); // Inicializar isLiked
        setLikesCount(projectData.likesCount || 0); // Inicializar likesCount
      } else {
        setError("Projeto não encontrado.");
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0); // Rola para o topo da página
  }, [project]); // Rola para o topo sempre que o projeto carregar ou mudar

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center">Carregando...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center">Erro: {error}</div>;
  }

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16"> {/* Adicionado padding top para não ficar atrás do Navbar */}
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
      </div>

      {/* Project Info */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-start">
          {/* Novo grupo para botão voltar + título/categoria */}
          <div className="flex items-center">
            {/* Botão Voltar Movido e Estilizado */}
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-red-600 rounded-full hover:bg-zinc-700 transition-colors mr-10"
            >
              <ArrowLeft size={24} />
            </button> 
            <div>
              <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
              <p className="text-xl text-gray-400 mb-6">{project.category}</p>
            </div>
          </div>
          {/* Botão Curtir e Contagem */}
          <div className="flex flex-col items-center"> {/* Container para botão e texto */}
            <button
              onClick={() => {
                const newIsLiked = !isLiked;
                const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;
                setIsLiked(newIsLiked);
                setLikesCount(newLikesCount);
                updateLikes(newIsLiked, newLikesCount); // Chamar função para atualizar o banco de dados
              }}
              className={`p-3 rounded-full transition-colors ${
                isLiked ? 'bg-red-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
            >
              <Heart size={24} fill={isLiked ? 'white' : 'none'} />
            </button>
            <p className="text-sm text-gray-400 mt-2">{likesCount} pessoas curtiram</p> {/* Exibição da contagem */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Sobre o Projeto</h2>
            <p className="text-gray-300 leading-relaxed mb-8">{project.description}</p>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Cliente</h3>
              <p className="text-gray-300">{project.client}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Cargo</h3>
              <p className="text-gray-300">{project.role}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Ano</h3>
              <p className="text-gray-300">{project.year}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Tecnologias</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-600 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* Project Video */}
        {/* Project Video */}
        {project.video && (
          <div className="mt-16 rounded-lg overflow-hidden relative"> {/* Adicionado relative para posicionar o loader */}
            {videoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
              </div>
            )}
            <video
              controls
              autoPlay
              muted
              className="w-full"
              onWaiting={() => setVideoLoading(true)}
              onPlaying={() => setVideoLoading(false)}
              onLoadedData={() => setVideoLoading(false)} // Adicionado para casos onde o vídeo carrega rápido
            >
              <source src={project.video} type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>
        )}

        {/* Project Images */}
        <div className="mt-16 space-y-8">
          {project.detailImages.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`${project.title} detail ${index + 1}`}
                className="w-full"
              />
            </div>
          ))}
        </div>
        {/* Botão Voltar (abaixo das imagens) */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-red-600 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <Smile size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
