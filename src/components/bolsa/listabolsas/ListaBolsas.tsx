/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type Bolsa from "../../../models/Bolsa";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardBolsa from "../cardbolsa/CardBolsa";
import { PlusIcon } from "lucide-react";
function ListaBolsas() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [bolsas, setBolsas] = useState<Bolsa[]>([]);
    useEffect(() => {
        buscarBolsas();
    }, []);
    async function buscarBolsas() {
        try {
            setIsLoading(true);
            await buscar("/bolsa", setBolsas, {});
        } catch (error: any) {
            ToastAlerta('Erro ao buscar bolsas', 'erro');
        } finally {
            setIsLoading(false);
        }
    }
    function handleCreate() {
        navigate('/bolsascadastrar');
    }
    return (
        <>
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader color="#312e81" size={32} />
                </div>
            )}
            <div className="bg-gray-50 min-h-screen p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Gestão de Bolsas
                    </h1>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-azulescuro text-white text-sm hover:bg-blue-700 transition"
                    >
                        <PlusIcon size={18} />
                        Nova Bolsa
                    </button>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-6 px-6 py-3 text-xs font-semibold text-gray-500 border-b border-gray-200">
                        <span>NOME</span>
                        <span>INSTITUIÇÃO</span>
                        <span>PORCENTAGEM</span>
                        <span>CURSO</span>
                        <span>ESTUDANTES</span>
                        <span className="text-right">AÇÕES</span>
                    </div>
                    {!isLoading && bolsas.length === 0 && (
                        <div className="px-6 py-10 text-center text-sm text-gray-500">
                            Nenhuma bolsa cadastrada.
                        </div>
                    )}
                    {bolsas.map(bolsa => (
                        <CardBolsa
                            key={bolsa.id}
                            bolsa={bolsa}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
export default ListaBolsas;