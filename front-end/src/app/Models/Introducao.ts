import { Jogador } from "./Jogador";

export interface Introducao{
    jogadorInicial : Jogador;
    jogadorIntrodutor : Jogador;
    jogadorObjetivo : Jogador;
    estado : string;
}