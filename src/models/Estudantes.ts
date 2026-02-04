import type Bolsa from "./Bolsa";
export default interface Estudantes {
  id: number;
  nome: string;
  email: string;
  endereco: string;
  idade: number;
  cursoInteresse: string;
  ativo: boolean;
  avatar: string;
  bolsa?: Bolsa | null;
}