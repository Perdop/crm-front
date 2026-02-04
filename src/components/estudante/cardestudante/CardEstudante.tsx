import { useState } from "react";
import { Link } from "react-router-dom";
import type Estudantes from "../../../models/Estudantes";
import { TrashIcon } from "lucide-react";
import { PencilSimpleIcon } from "@phosphor-icons/react";
import { deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
interface CardEstudanteProps {
  estudante: Estudantes;
  onAtualizar?: () => void;
}
export default function CardEstudante({ estudante, onAtualizar }: CardEstudanteProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeletar = async () => {
    if (!window.confirm("Tem certeza que deseja deletar este estudante?")) return;
    setIsDeleting(true);
    try {
      await deletar(`/estudante/${estudante.id}`, {});
      ToastAlerta("Estudante deletado com sucesso!", "success");
      onAtualizar?.();
    } catch (error) {
      console.error(error);
      ToastAlerta("Erro ao deletar estudante.", "error");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="grid grid-cols-6 items-center px-6 py-4 bg-white border-b border-gray-200 text-sm hover:bg-gray-50 transition">
      {}
      <div className="flex items-center gap-3">
        <img
          src={
            estudante.avatar && estudante.avatar !== "initials"
              ? estudante.avatar
              : `https:`
          }
          alt={estudante.nome}
          className="h-10 w-10 rounded-full object-cover border-2 border-gray-300"
        />
        <span className="text-gray-900 font-medium">{estudante.nome}</span>
      </div>
      {}
      <span className="text-gray-500">{estudante.email}</span>
      {}
      <span className="text-gray-700">{estudante.cursoInteresse}</span>
      {}
      <span className="text-gray-600">{estudante.bolsa?.nome || "-"}</span>
      {}
      <span
        className={`text-xs font-semibold inline-block px-2 py-1 rounded ${
          estudante.ativo ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
        }`}
      >
        {estudante.ativo ? "Ativo" : "Inativo"}
      </span>
      {}
      <div className="flex gap-2 justify-end">
        <Link
          to={`/estudanteeditar/${estudante.id}`}
          className="px-3 py-1.5 text-xs font-medium text-slate-100 bg-indigo-400 hover:bg-indigo-800 rounded transition flex items-center justify-center"
        >
          <PencilSimpleIcon size={16} />
        </Link>
        <button
          onClick={handleDeletar}
          disabled={isDeleting}
          className="px-3 py-1.5 text-xs font-medium text-slate-100 bg-red-400 hover:bg-red-700 rounded transition flex items-center justify-center"
        >
          {isDeleting ? "..." : <TrashIcon size={16} />}
        </button>
      </div>
    </div>
  );
}
