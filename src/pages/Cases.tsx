import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Remove the import statement
import { Filter } from 'lucide-react';
import { supabase } from '../supabaseClient';
import classnames from 'classnames';

interface Project {
  id: string; // Add the id property
  image: string;
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  detailImages: string[]; // Adjust to accommodate detail images
}

const Cases: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
const navigate = useNavigate();
const [isFilterOpen, setIsFilterOpen] = useState(false);
// Remove the navigate declaration

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('cases')
        .select('*');

      if (error) {
        console.error('Erro ao buscar os casos:', error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  const allCategories = ["Todos", ...Array.from(new Set(projects.map((project) => project.category)))];

  const filteredProjects = selectedCategory === "Todos"
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meus Cases</h1>
          <p className="text-xl text-gray-400">
            Confira alguns dos projetos que desenvolvi para clientes em diferentes setores.
            Cada case representa um desafio único e uma solução personalizada.
          </p>
        </div>

        {/* Filtro Mobile */}
        <div className="md:hidden mb-8">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between bg-gray-800 p-4 rounded-md"
          >
            <span>Filtrar por: {selectedCategory}</span>
            <Filter size={20} />
          </button>

          {isFilterOpen && (
            <div className="mt-2 bg-gray-800 rounded-md overflow-hidden">
              {allCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsFilterOpen(false);
                  }}
                  className={classnames(
                    "w-full p-4 text-left",
                    {
                      "bg-gray-800 text-red-600": selectedCategory === category,
                      "hover:bg-zinc-800": selectedCategory !== category,
                    }
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filtro Desktop */}
        <div className="hidden md:flex justify-center mb-12">
          <div className="flex space-x-2 bg-gray-800 p-1 rounded-full">
            {allCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={classnames(
                  "px-6 py-2 rounded-full transition-colors",
                  {
                    "bg-red-600 text-white": selectedCategory === category,
                    "text-gray-400 hover:text-white": selectedCategory !== category,
                  }
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

{/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="group bg-gray-800 rounded-lg overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:opacity-75 transition duration-300" />
              <h3 className="text-lg font-medium text-white mt-4 ml-4">{project.title}</h3>
              <p className="text-sm text-gray-400 ml-4">{project.year}</p>
              <button onClick={() => navigate(`/project/${project.id}`)} className="bg-red-600 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded mt-4 mb-4 ml-4">Ver mais</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cases;
