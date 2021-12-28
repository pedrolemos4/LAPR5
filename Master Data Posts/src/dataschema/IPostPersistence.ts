import { List } from "lodash";

export interface IPostPersistence{
    domainId: string;
    description: string;
    email: string;
    listaComentarios: List<string>;
    likes: List<string>;
    dislikes: List<string>;
}