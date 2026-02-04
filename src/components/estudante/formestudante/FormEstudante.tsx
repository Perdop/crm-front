/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChangeEvent, useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Estudantes from "../../../models/Estudantes";
import type Bolsa from "../../../models/Bolsa";
import { buscarDireto, cadastrar, atualizar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { SyncLoader } from "react-spinners";

interface FormEstudanteProps {
  estudanteInicial?: Estudantes; // para modal
  onSuccess?: (estudante: Estudantes) => Promise<void> | void; // callback após salvar
  id?: string; // opcional, para edição
}

// Fallback seguro para bolsa
const bolsaPadrao: Bolsa = {
  id: 0,
  nome: "",
  instituicao: "",
  porcentagem: 0,
  curso: "",
  validade: "",
  ativa: false,
};

export default function FormEstudante({ estudanteInicial, onSuccess, id }: FormEstudanteProps) {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const estudanteId = id ?? params.id;

  const estudantePadrao: Estudantes = {
    id: 0,
    nome: "",
    email: "",
    endereco: "",
    idade: 0,
    cursoInteresse: "",
    ativo: true,
    avatar: "adventurer",
    bolsa: bolsaPadrao,
  };

  const [estudante, setEstudante] = useState<Estudantes>(estudanteInicial ?? estudantePadrao);
  const [bolsas, setBolsas] = useState<Bolsa[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Carrega bolsas e estudante
  useEffect(() => {
    async function carregarDados() {
      try {
        setIsLoading(true);
        const dadosBolsas: Bolsa[] = await buscarDireto("/bolsa", {});
        setBolsas(dadosBolsas);

        if (estudanteId) {
          const dadosEstudante: Estudantes = await buscarDireto(`/estudante/${estudanteId}`, {});
          setEstudante({
            ...dadosEstudante,
            bolsa: dadosEstudante.bolsa ?? dadosBolsas[0] ?? bolsaPadrao,
          });
        } else {
          setEstudante({
            ...estudanteInicial ?? estudantePadrao,
            bolsa: dadosBolsas[0] ?? bolsaPadrao,
          });
        }
      } catch (error) {
        console.error(error);
        ToastAlerta("Erro ao carregar dados.", "error");
      } finally {
        setIsLoading(false);
      }
    }
    carregarDados();
  }, [estudanteId, estudanteInicial]);

  // Atualiza campos simples
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    let novoValor: any = value;
    if (name === "idade") novoValor = Number(value);
    if (name === "ativo") novoValor = value === "true";
    setEstudante({ ...estudante, [name]: novoValor });
  }

  // Atualiza bolsa
  function handleBolsaChange(e: ChangeEvent<HTMLSelectElement>) {
    const selecionada = bolsas.find((b) => b.id === Number(e.target.value)) ?? bolsaPadrao;
    setEstudante({ ...estudante, bolsa: selecionada });
  }

  // Salvar formulário
  async function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = { ...estudante, bolsaId: estudante.bolsa?.id ?? 0 };

      if (estudanteId || estudante.id) {
        await atualizar("/estudante", payload, () => {}, {});
        ToastAlerta("Estudante atualizado com sucesso!", "success");
      } else {
        await cadastrar("/estudante", payload, () => {}, {});
        ToastAlerta("Estudante cadastrado com sucesso!", "success");
      }

      if (onSuccess) {
        await onSuccess(payload as Estudantes); // chama callback do modal
      } else {
        navigate("/estudantes"); // navegação padrão
      }
    } catch (error) {
      console.error(error);
      ToastAlerta("Erro ao salvar estudante.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {estudanteId ? "Editar Estudante" : "Cadastrar Estudante"}
        </h1>
        {isLoading ? (
          <div className="flex justify-center my-10">
            <SyncLoader color="#3B82F6" size={10} />
          </div>
        ) : (
          <form onSubmit={salvar} className="space-y-5">
            {/* Nome */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 font-medium">Nome</label>
              <input
                type="text"
                name="nome"
                placeholder="Digite o nome"
                value={estudante.nome}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Digite o email"
                value={estudante.email}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Endereço */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 font-medium">Endereço</label>
              <input
                type="text"
                name="endereco"
                placeholder="Digite o endereço"
                value={estudante.endereco}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Idade */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 font-medium">Idade</label>
              <input
                type="number"
                name="idade"
                placeholder="Digite a idade"
                value={estudante.idade}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Curso */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 font-medium">Curso de Interesse</label>
              <input
                type="text"
                name="cursoInteresse"
                placeholder="Digite o curso"
                value={estudante.cursoInteresse}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 font-medium">Status</label>
              <select
                name="ativo"
                value={String(estudante.ativo)}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>

            {/* Bolsa */}
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1 font-medium">Bolsa</label>
              <select
                name="bolsa"
                value={estudante.bolsa?.id ?? 0}
                onChange={handleBolsaChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {bolsas.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nome}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold hover:from-blue-700 hover:to-blue-500 transition"
            >
              {estudanteId ? "Atualizar" : "Cadastrar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
