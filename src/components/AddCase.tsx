import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom'; // Importação mantida caso seja usada futuramente

const AddCase: React.FC = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  const [year, setYear] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [detailImages, setDetailImages] = useState('');
  const [video, setVideo] = useState(''); // Adicionado estado para o URL do vídeo
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Variável mantida caso seja usada futuramente

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const technologiesArray = technologies.split(',').map(tech => tech.trim());
    const detailImagesArray = detailImages.split(',').map(img => img.trim());

    try {
      const { error } = await supabase
        .from('cases')
        .insert([
          {
            title,
            image,
            category,
            client,
            description,
            role,
            year: parseInt(year || '0'),
            technologies: technologiesArray,
            detailImages: detailImagesArray,
            video: video || null, // Adicionado campo de vídeo
          },
        ]);

      if (error) {
        console.error("Erro ao adicionar case:", error);
        alert(error.message);
      } else {
        alert('Case adicionado com sucesso!');
        navigate('/admin'); // Redireciona após sucesso
      }
    } catch (error) { // Removido o tipo 'any'
      console.error("Erro ao adicionar case:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2>Adicionar Novo Case</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos do formulário... (mantidos como antes) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Imagem Principal (URL)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Categoria</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Cliente</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Cargo</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ano</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tecnologias (separadas por vírgula)</label>
          <input
            type="text"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Detalhes do Case (URLs separadas por vírgula)</label>
          <input
            type="text"
            value={detailImages}
            onChange={(e) => setDetailImages(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Novo campo para URL do Vídeo */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">URL do Vídeo</label>
          <input
            type="text"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Adicionando...' : 'Adicionar Case'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCase;
