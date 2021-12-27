import { List } from "lodash";

export interface IComentarioPersistence {
    domainId: string;
    autor: string;
    texto: string;
    likes: List<string>;
    dislikes: List<string>;
  }