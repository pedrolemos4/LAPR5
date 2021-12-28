import { List } from "lodash";
import { Post } from "../domain/post";

export interface IComentarioDTO {
    id: string;
    autor: string;
    post: string;
    texto: string;
    likes: List<string>;
    dislikes: List<string>;
  }