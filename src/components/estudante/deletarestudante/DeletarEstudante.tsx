import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Estudantes from "../../../models/Estudantes";
import { buscarDireto, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarEstudante() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [estudante, setEstudante] = useState<Estudantes | null>(null);

  // Carregar estudante pelo ID
  useEffect(() => {
    if (!id) return;

    const carregarEstudante = async () => {
      try {
        const dados = await buscarDireto(`/estudante/${id}`, {});
        setEstudante(dados);
      } catch (error) {
        ToastAlerta("Erro ao carregar estudante.", "error");
        console.error(error);
      }
    };

    carregarEstudante();
  }, [id]);

  // Deletar estudante
  const deletarEstudante = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      await deletar(`/estudante/${id}`, {});
      ToastAlerta("Estudante apagado com sucesso!", "success");
      navigate("/estudantes");
    } catch (error) {
      ToastAlerta("Erro ao deletar o estudante.", "error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Retornar sem deletar
  const retornar = () => navigate("/estudantes");

  if (!estudante) return null;

  return (
    <main className="container w-1/3 mx-auto mt-12">
      <h1 className="text-4xl text-center font-bold mb-6 text-azulescuro">
        Deletar Estudante
      </h1>
      <p className="text-center font-semibold mb-4">
        Tem certeza que deseja deletar este estudante?
      </p>
      <section className="border rounded-2xl overflow-hidden shadow-md flex flex-col justify-between bg-white">
        {/* Cabeçalho */}
        <header className="bg-azulescuro text-white font-bold text-xl py-3 px-6">
          Informações do Estudante
        </header>

        {/* Conteúdo */}
        <div className="p-6 flex flex-col gap-3">
          <p><strong>Nome:</strong> {estudante.nome}</p>
          <p><strong>Email:</strong> {estudante.email}</p>
          <p><strong>Endereço:</strong> {estudante.endereco}</p>
          <p><strong>Idade:</strong> {estudante.idade || "-"}</p>
          <p><strong>Curso:</strong> {estudante.cursoInteresse}</p>
          <p><strong>Bolsa:</strong> {estudante.bolsa?.nome || "-"}</p>
        </div>

        {/* Rodapé */}
        <footer className="flex gap-2">
          <button
            onClick={retornar}
            className="w-full py-2 rounded bg-gray-400 hover:bg-gray-700 text-white transition"
          >
            Cancelar
          </button>
          <button
            onClick={deletarEstudante}
            className="w-full py-2 rounded bg-red-400 hover:bg-red-700 text-white flex items-center justify-center transition"
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : "Deletar"}
          </button>
        </footer>
      </section>
    </main>
  );
}

export default DeletarEstudante;
