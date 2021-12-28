import { List } from "lodash";
import { Comentario } from "../domain/comentario";

export interface IPostPersistence{
    domainId: string;
    description: string;
    email: string;
    listaComentarios: List<string>;
    likes: List<string>;
    dislikes: List<string>;
}