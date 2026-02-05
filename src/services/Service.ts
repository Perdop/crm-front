/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from "axios";
const api = axios.create({
    baseURL: "https://crm-back-ejpg.onrender.com/",
});
export const buscar = async (
    url: string,
    setDados: Function,
    header: object
) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
};
export const buscarDireto = async (url: string, header: object) => {
    const resposta = await api.get(url, header);
    return resposta.data;
};
export const cadastrar = async (
    url: string,
    dados: object,
    setDados: Function,
    header: object
) => {
    const resposta = await api.post(url, dados, header);
    if (setDados) setDados(resposta.data);
    return resposta.data;
};
export const atualizar = async (
    url: string,
    dados: object,
    setDados: Function,
    header: object
) => {
    const resposta = await api.put(url, dados, header);
    if (setDados) setDados(resposta.data);
    return resposta.data;
};
export const atualizarStatus = async (
    url: string,
    dados: object,
    header: object
) => {
    const resposta = await api.put(url, dados, header);
    return resposta.data;
};
export const deletar = async (url: string, header: object) => {
    await api.delete(url, header);
};