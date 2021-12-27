import { Result } from "../../core/logic/Result";
import IPostDTO from "../../dto/IPostDTO";

export default interface IPostService {
    createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>>;
    updatePost(postDTO: IPostDTO): Promise<Result<IPostDTO>>;
    getPosts(): Promise<Result<IPostDTO[]>>;
}