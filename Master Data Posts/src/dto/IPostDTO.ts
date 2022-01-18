import { List } from "lodash";

export default interface IPostDTO{
    id: string;
    description: string;
    email: string;
    listaComentarios: string[];
    tags: List<string>;
    likes: List<string>;
    dislikes: List<string>;
}