import { List } from "lodash";
import { User } from "../domain/user";

export default interface IPostDTO{
    id: string;
    description: string;
    email: string;
    likes: List<string>;
    dislikes: List<string>;
}