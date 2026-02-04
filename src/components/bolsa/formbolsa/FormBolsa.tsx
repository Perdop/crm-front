/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, type ChangeEvent, type FormEvent, useState } from "react";
import { atualizar, buscar, cadastrar, atualizarStatus } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import type Bolsa from "../../../models/Bolsa";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

export function FormBolsa() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [bolsa, setBolsa] = useState<Bolsa>({} as Bolsa);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Buscar bolsa por ID
    async function buscarPorId(id: string) {
        try {
            await buscar(`/bolsa/${id}`, setBolsa, {});
        } catch {
            ToastAlerta("Erro ao buscar bolsa", "erro");
        }
    }

    useEffect(() => {
        if (id) buscarPorId(id);
    }, [id]);

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setBolsa(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : type === "checkbox" ? checked : value,
        }));
    }

    async function handleStatusChange(e: ChangeEvent<HTMLInputElement>) {
        const novaAtiva = e.target.checked;
        setBolsa(prev => ({ ...prev, ativa: novaAtiva }));
        if (id) {
            try {
                await atualizarStatus(`/bolsa/${id}/status`, { ativa: novaAtiva ? 1 : 0 }, {});
            } catch {
                ToastAlerta("Erro ao atualizar status", "erro");
                setBolsa(prev => ({ ...prev, ativa: !novaAtiva }));
            }
        }
    }

    function handleCancel() {
        navigate("/bolsas");
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const { estudante, ...bolsaData } = bolsa; // remove estudantes do payload
        try {
            if (id) {
                await atualizar(`/bolsa`, bolsaData, setBolsa, {});
                ToastAlerta("Bolsa atualizada com sucesso", "sucesso");
            } else {
                await cadastrar(`/bolsa`, bolsaData, setBolsa, {});
                ToastAlerta("Bolsa cadastrada com sucesso", "sucesso");
            }
            handleCancel();
        } catch {
            ToastAlerta("Erro ao salvar bolsa", "erro");
        } finally {
            setIsLoading(false);
        }
    }

    // Quantidade de estudantes vinculados (safe)
    const totalEstudantes = bolsa.estudante?.length ?? 0;

    return (
        <div className="bg-gray-50 min-h-screen p-6 flex items-center justify-center">
            <div className="bg-white rounded-xl w-full max-w-2xl p-8 shadow-lg">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                    {id ? "Editar Bolsa" : "Cadastrar Bolsa"}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Bolsa</label>
                        <input
                            type="text"
                            name="nome"
                            value={bolsa.nome || ""}
                            onChange={handleChange}
                            required
                            placeholder="Ex: Bolsa Integral"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
                        <input
                            type="text"
                            name="instituicao"
                            value={bolsa.instituicao || ""}
                            onChange={handleChange}
                            required
                            placeholder="Ex: Tech School"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Porcentagem de Bolsa (%)</label>
                        <input
                            type="number"
                            name="porcentagem"
                            min={0}
                            max={100}
                            value={bolsa.porcentagem || 0}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
                        <input
                            type="text"
                            name="curso"
                            value={bolsa.curso || ""}
                            onChange={handleChange}
                            required
                            placeholder="Ex: Engenharia de Software"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Validade</label>
                        <input
                            type="date"
                            name="validade"
                            value={bolsa.validade ?? ""}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="ativa"
                                checked={bolsa.ativa}
                                onChange={handleStatusChange}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                            />
                            <span className="text-sm text-gray-700">Bolsa Ativa</span>
                        </div>
                    </div>

                    {totalEstudantes > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                            <p className="text-sm text-blue-800">
                                <strong>Estudantes vinculados:</strong> {totalEstudantes}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <ClipLoader size={16} color={"#ffffff"} />
                                    <span>Salvando...</span>
                                </>
                            ) : (
                                <span>{id ? "Atualizar" : "Cadastrar"}</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
