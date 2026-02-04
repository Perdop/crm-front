import { X } from "lucide-react";
interface AvatarSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (avatar: string) => void;
  nome: string;
}
function AvatarSelector({ isOpen, onClose, onSelect, nome }: AvatarSelectorProps) {
  if (!isOpen) return null;
  const estilos = [
    "adventurer",
    "avataaars",
    "bottts",
    "micah",
    "fun-emoji",
    "initials"
  ];
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[400px] shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X />
        </button>
        <h3 className="text-lg font-bold mb-4 text-azulescuro">
          Escolher Avatar
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {estilos.map((estilo) => (
            <img
              key={estilo}
              src={`https://api.dicebear.com/7.x/${estilo}/svg?seed=${nome}`}
              alt="avatar"
              onClick={() => {
                onSelect(estilo);
                onClose();
              }}
              className="w-20 h-20 rounded-full cursor-pointer hover:scale-110 transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default AvatarSelector;
