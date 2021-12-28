import { List } from "lodash";
import { Comentario } from "../domain/comentario";

export default interface IPostDTO{
    id: string;
    description: string;
    email: string;
    listaComentarios: List<string>;
    likes: List<string>;
    dislikes: List<string>;
}