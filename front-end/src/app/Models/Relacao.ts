import { Jogador } from "./Jogador";

export interface Relacao{
    jogador1 : string;
    jogador2 : string;
    listaTags : string[];
    forcaRelacao : string;
    forcaLigacao : string;
}