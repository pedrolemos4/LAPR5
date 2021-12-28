import { List } from "lodash";
import { ComentarioId } from "../domain/comentarioId";

export interface IPostPersistence{
    domainId: string;
    description: string;
    email: string;
    listaComentarios: string[];
    likes: List<string>;
    dislikes: List<string>;
}