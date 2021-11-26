import { Jogador } from "./Jogador";

export interface Relacao{
    jogador1 : Jogador;
    jogador2 : Jogador;
    listaTags : string[];
    forcaRelacao : string;
    forcaLigacao : string;
}