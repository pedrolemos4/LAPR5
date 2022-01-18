import { Result } from "../../core/logic/Result";
import { IComentarioDTO } from "../../dto/IComentarioDTO";

export default interface IComentarioService {
    updateDislikes(arg0: IComentarioDTO): Promise<Result<IComentarioDTO>>;
    updateLikes(arg0: IComentarioDTO): Promise<Result<IComentarioDTO>>;
    delete(id: any);
    getComentarioByAutor(autor: any);
    createComentario(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>>;
    getComentarioById(comentarioId: any);
    getComentarios(): Promise<Result<IComentarioDTO[]>>;
}