import { List } from "lodash";
import { Comentario } from "../domain/comentario";
import { ComentarioId } from "../domain/comentarioId";

export default interface IPostDTO{
    id: string;
    description: string;
    email: string;
    listaComentarios: string[];
    likes: List<string>;
    dislikes: List<string>;
}