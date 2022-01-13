import { Repo } from "../../core/infra/Repo";
import { Comentario } from "../../domain/comentario";
import { ComentarioId } from "../../domain/comentarioId";
import { Post } from "../../domain/post";

export default interface IComentarioRepo extends Repo<Comentario> {
    getDomainId(id: any);
    delete(id: string);
    findByAutor(autor: any);
    findById(comentarioId: any);
	save(comentario: Comentario): Promise<Comentario>;
    getComentarios();
}