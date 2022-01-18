import { List } from "lodash";

export interface IPostPersistence{
    domainId: string;
    description: string;
    email: string;
    listaComentarios: string[];
    tags: List<string>;
    likes: List<string>;
    dislikes: List<string>;
}