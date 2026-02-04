/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { TrashIcon, XIcon } from 'lucide-react';
import type Bolsa from "../../../models/Bolsa";
import { useEffect, useState } from "react";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarBolsa() {
  const navigate = useNavigate();
  const [bolsa, setBolsa] = useState<Bolsa>({} as Bolsa);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  // Buscar bolsa por ID
  async function buscarPorId(id: string) {
    try {
      await buscar(`/bolsa/${id}`, setBolsa, {});
    } catch (error: any) {
      ToastAlerta('Erro ao buscar bolsa', 'erro');
    }
  }

  useEffect(() => {
    if (id) buscarPorId(id);
  }, [id]);

  function retornar() {
    navigate('/bolsas');
  }

  // Deletar bolsa
  async function deletarBolsa() {
    // Checar se há estudantes vinculados
    if ((bolsa.estudante?.length ?? 0) > 0) {
      ToastAlerta(
        `Não é possível deletar. Existem ${bolsa.estudante!.length} estudante(s) vinculado(s) a esta bolsa.`,
        'info'
      );
      retornar();
      return;
    }

    setIsLoading(true);
    try {
      await deletar(`/bolsa/${id}`, {});
      ToastAlerta('Bolsa deletada com sucesso', 'sucesso');
    } catch (error: any) {
      ToastAlerta('Erro ao deletar bolsa', 'erro');
    } finally {
      setIsLoading(false);
      retornar();
    }
  }

  const totalEstudantes = bolsa.estudante?.length ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-6 pb-4">
          <div className="flex items-center gap-2 text-red-600">
            <TrashIcon size={22} />
            <h2 className="text-lg font-semibold">Deletar Bolsa</h2>
          </div>
          <button onClick={retornar}>
            <XIcon size={20} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Corpo */}
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-600 mb-4">
            Tem certeza que deseja excluir a bolsa{' '}
            <span className="font-semibold text-gray-800">{bolsa.nome}</span>?
          </p>

          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <div className="bg-indigo-800 text-white font-bold text-lg py-2 px-4">
              Detalhes da Bolsa
            </div>
            <div className="bg-slate-50 p-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium text-gray-700">Nome:</span>{' '}
                <span className="text-gray-900">{bolsa.nome}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Instituição:</span>{' '}
                <span className="text-gray-900">{bolsa.instituicao}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Porcentagem:</span>{' '}
                <span className="text-gray-900">{bolsa.porcentagem}%</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-700">Curso:</span>{' '}
                <span className="text-gray-900">{bolsa.curso}</span>
              </p>
              {totalEstudantes > 0 && (
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Estudantes vinculados:</span>{' '}
                  <span className="text-red-600 font-semibold">{totalEstudantes}</span>
                </p>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-500">Essa ação não poderá ser desfeita.</p>
        </div>

        {/* Rodapé */}
        <div className="flex border-t border-gray-200">
          <button
            onClick={retornar}
            className="w-1/2 py-3 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={deletarBolsa}
            disabled={isLoading}
            className="w-1/2 py-3 text-sm text-white bg-red-600 hover:bg-red-700 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <ClipLoader size={18} color="#ffffff" />
                <span>Deletando...</span>
              </>
            ) : (
              <span>Confirmar Exclusão</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarBolsa;
