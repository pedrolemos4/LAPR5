import { List } from "lodash";
import { User } from "../domain/user";

export interface IComentarioDTO {
    autor: User;
    texto: string;
    likes: List<User>;
    dislikes: List<User>;
  }