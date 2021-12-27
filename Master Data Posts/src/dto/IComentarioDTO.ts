import { List } from "lodash";

export interface IComentarioDTO {
    id: string;
    autor: string;
    texto: string;
    likes: List<string>;
    dislikes: List<string>;
  }