import { Result } from "../../core/logic/Result";
import { Comentario } from "../../domain/comentario";
import { IComentarioDTO } from "../../dto/IComentarioDTO";

export default interface IComentarioService {
    delete(id: any);
    getComentarioByAutor(autor: any): Promise<Result<IComentarioDTO[]>>;
    createComentario(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>>;
    getComentarioById(comentarioId: any);
    getComentarios(): Promise<Result<IComentarioDTO[]>>;
}