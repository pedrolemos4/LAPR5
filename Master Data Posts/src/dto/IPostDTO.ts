import { List } from "lodash";

export default interface IPostDTO{
    id: string;
    description: string;
    email: string;
    listaComentarios: string[];
    likes: List<string>;
    dislikes: List<string>;
}