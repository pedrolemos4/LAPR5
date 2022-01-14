import { Result } from "../../core/logic/Result";
import IListDTO from "../../dto/IListDTO";
import IPostDTO from "../../dto/IPostDTO";

export default interface IPostService {
    atualizaComments(idComentario: IListDTO);
    delete(id: any);
    getPostsByEmail(key: any);
    createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>>;
    updatePost(postDTO: IPostDTO): Promise<Result<IPostDTO>>;
    getPosts(): Promise<Result<IPostDTO[]>>;
}