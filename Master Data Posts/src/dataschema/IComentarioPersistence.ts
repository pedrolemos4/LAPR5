import { List } from "lodash";
import { User } from "../domain/user";

export interface IComentarioPersistence {
    id: string;
    autor: User;
    texto: string;
    likes: List<User>;
    dislikes: List<User>;
  }