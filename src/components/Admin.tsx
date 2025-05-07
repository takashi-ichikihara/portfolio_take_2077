import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import CaseList from './CaseList';
import { Case } from './Case'; // Importando a interface Case

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true); // Manter loading para o fetch inicial

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const { data, error } = await supabase
          .from('cases') // Assumindo que a tabela se chama 'cases'
          .select('*, isLiked, likesCount') // Incluir isLiked e likesCount na busca
          .order('created_at', { ascending: false }); // Adicionado ordenação

        if (error) {
          throw error;
        }
        setCases(data || []);
      } catch (error) {
        console.error('Erro ao buscar os cases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []); // Adicionado dependência vazia para rodar apenas uma vez

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4 m-20">
      <div className="flex justify-between items-center mb-4"> {/* Flex container para cabeçalho */}
        <h1>Área Administrativa</h1>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
      <Link to="/admin/add" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"> {/* Adicionado mb-4 e inline-block para espaçamento */}
        Adicionar Case
      </Link>
      {loading ? (
        <p>Carregando cases...</p>
      ) : (
        <CaseList cases={cases} />
      )}
      <Outlet />
    </div>
  );
};

export default Admin;
