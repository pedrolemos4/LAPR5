import { Result } from "../../core/logic/Result";
import { Comentario } from "../../domain/comentario";
import { IComentarioDTO } from "../../dto/IComentarioDTO";

export default interface IComentarioService {
    getComentarioByAutor(autor: any): Promise<Result<IComentarioDTO[]>>;
    createComentario(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>>;
    getComentarioById(comentarioId: string): Promise<Result<Comentario>>;
    getComentarios(): Promise<Result<IComentarioDTO[]>>;
}