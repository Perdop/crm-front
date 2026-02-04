import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FormEstudante from "../formestudante/FormEstudante";
import type Estudantes from "../../../models/Estudantes";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { cadastrar, atualizar } from "../../../services/Service";

interface ModalProps {
  onSuccess?: () => void;
  estudanteParaEditar?: Estudantes;
}

export default function ModalEstudante({ onSuccess, estudanteParaEditar }: ModalProps) {
  async function handleSubmit(estudante: Estudantes) {
    try {
      if (estudante.id) {
        await atualizar("/estudante", estudante, () => {}, {});
        ToastAlerta("Estudante atualizado com sucesso!", "success");
      } else {
        await cadastrar("/estudante", estudante, () => {}, {});
        ToastAlerta("Estudante cadastrado com sucesso!", "success");
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
      ToastAlerta("Erro ao salvar estudante", "error");
    }
  }

  return (
    <Popup
      trigger={
        <button
          className="bg-dourado text-preto px-4 py-2 rounded hover:bg-azulescuro hover:text-white transition"
        >
          {estudanteParaEditar ? "Editar Estudante" : "Cadastrar Estudante"}
        </button>
      }
      modal
      nested
      contentStyle={{
        background: "#fff",
        borderRadius: "1rem",
        padding: "2rem",
        width: "480px",
        maxHeight: "85vh",
        overflowY: "auto",
      }}
      overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="flex flex-col gap-4">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-azulescuro">
            {estudanteParaEditar ? "Editar Estudante" : "Cadastrar Estudante"}
          </h2>
          <button
            className="text-2xl font-bold text-azulescuro hover:text-dourado transition"
          >
            &times;
          </button>
        </div>

        {/* Formulário */}
        <FormEstudante
            estudanteInicial={estudanteParaEditar}
            onSuccess={async (estudante) => {
              await handleSubmit(estudante);
              close(); 
            }}
          />
      </div>
    </Popup>
  );
}
