import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Importando supabase
import { Case } from './Case';

interface Props {
  cases: Case[];
}

const CaseList: React.FC<Props> = ({ cases }) => {
  const handleDeleteCase = async (id: string) => {
    try {
      const { data, error } = await supabase.from('cases').delete().eq('id', id);
      if (error) {
        console.error('Erro ao excluir o case:', error);
        alert('Erro ao excluir o case.');
      } else {
        // Opcional: Atualizar o estado no componente pai se necessário
        console.log('Case excluído com sucesso:', data);
      }
    } catch (error: unknown) {
      console.error('Erro ao excluir o case:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Ocorreu um erro desconhecido ao excluir o case.');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cases.map((caseItem) => (
        <div key={caseItem.id} className="bg-white rounded-lg shadow-md p-4">
          <img src={caseItem.image} alt={caseItem.title} className="w-full h-40 object-cover rounded-md mb-2" />
          <h3 className="text-lg font-semibold mb-1">{caseItem.title}</h3>
          <p className="text-gray-600 text-sm mb-2">Cliente: {caseItem.client}</p>
          {/* Exibir contagem de likes */}
          {caseItem.likesCount !== undefined && (
            <p className="text-gray-600 text-sm mb-2">Likes: {caseItem.likesCount}</p>
          )}
          <div className="flex justify-end">
            <Link to={`/admin/edit/${caseItem.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2" >
              Editar
            </Link>
            <button onClick={() => handleDeleteCase(caseItem.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseList;
