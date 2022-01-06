import { List } from "lodash";

export interface IComentarioDTO {
    id: string;
    autor: string;
    post: string;
    texto: string;
    tags: List<string>;
    likes: List<string>;
    dislikes: List<string>;
  }