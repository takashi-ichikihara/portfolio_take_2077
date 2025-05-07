import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface Case {
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
  video?: string; // Adicionado campo opcional para vídeo
}

const allTechnologies = [
  "Wordpress", "Shopify", "React", "TypeScript", "Next.js", "JavaScript", "HTML5", "CSS3",
  "Tailwind CSS", "Bootstrap", "Framer", "Figma", "Adobe XD", "Wireframe", "Prototipagem",
  "Adobe Photoshop", "Ilustrator", "Canvas", "Lovable", "N8N", "HuggingFace", "ElevenLabs",
  "Kling AI", "Leonardo AI", "Ideogram", "MySQL", "Firebase", "MongoDB", "Supabase", "SEO",
  "Google Analytics", "Email Marketing", "Gestão de Midias Sociais", "Copywriting",
  "Capcut Pro", "Adobe Premiere"
];

const EditCase: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCase = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('cases')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }
        setCaseData(data as Case);
        setSelectedTechnologies(data?.technologies || []); // Inicializa o estado local com as tecnologias existentes
        console.log('Dados do case buscados:', data); // Log para verificar os dados
      } catch (error: unknown) {
        setError((error as Error).message || 'Erro ao buscar o case.');
        console.error('Erro ao buscar o case:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (caseData) {
      if (name === 'detailImages') {
        setCaseData({ ...caseData, [name]: value.split(',').map(item => item.trim()) });
      } else {
        setCaseData({ ...caseData, [name]: value });
      }
    }
  };

  const handleTechnologyChange = (technology: string) => {
    setSelectedTechnologies(prevTechnologies =>
      prevTechnologies.includes(technology)
        ? prevTechnologies.filter(tech => tech !== technology)
        : [...prevTechnologies, technology]
    );
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseData) return;
    setLoading(true);
    try {
      const updatedCaseData = {
        ...caseData,
        technologies: selectedTechnologies,
        video: caseData.video || null, // Incluir o campo de vídeo
      };
      const { error } = await supabase
        .from('cases')
        .update(updatedCaseData)
        .eq('id', id);

      if (error) {
        throw error;
      }
      alert('Case atualizado com sucesso!');
      navigate('/admin');
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || 'Erro ao atualizar o case.';
      setError(errorMessage);
      console.error('Erro ao atualizar o case:', error);
      // Log more details about the error
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error stack:', error.stack);
      }
      console.error('Case data being sent:', caseData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!caseData) return <p>Case não encontrado.</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Editar Case</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={caseData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagem</label>
          <input
            type="text"
            id="image"
            name="image"
            value={caseData.image}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
          <input
            type="text"
            id="category"
            name="category"
            value={caseData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700">Cliente</label>
          <input
            type="text"
            id="client"
            name="client"
            value={caseData.client}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={caseData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Cargo</label>
          <input
            type="text"
            id="role"
            name="role"
            value={caseData.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Ano</label>
          <input
            type="number"
            id="year"
            name="year"
            value={caseData.year}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
 <div>
          <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">Tecnologias</label>
          <div className="grid grid-cols-2 gap-2"> {/* Usando grid para melhor visualização */}
            {allTechnologies.map((technology, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`technology-${index}`}
                  name="technologies"
                  value={technology}
                  checked={selectedTechnologies.includes(technology)}
                  onChange={() => handleTechnologyChange(technology)}
                  className="mr-2"
                />
                <label htmlFor={`technology-${index}`} className="text-gray-700">{technology}</label>
              </div>
            ))}
          </div>
        </div>
        {/* Adicione campos para detailImages se necessário */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Detalhes do Portfolio</label>
          <input
            type="text"
            id="detailImages"
            name="detailImages"
            value={caseData.detailImages}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {/* Novo campo para URL do Vídeo */}
        <div>
          <label htmlFor="video" className="block text-sm font-medium text-gray-700">URL do Vídeo</label>
          <input
            type="text"
            id="video"
            name="video"
            value={caseData.video || ''} // Use '' para evitar undefined
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditCase;
