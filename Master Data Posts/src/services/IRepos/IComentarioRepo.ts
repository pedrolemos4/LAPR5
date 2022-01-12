import { Repo } from "../../core/infra/Repo";
import { Comentario } from "../../domain/comentario";
import { ComentarioId } from "../../domain/comentarioId";

export default interface IComentarioRepo extends Repo<Comentario> {
    delete(id: string);
    findByAutor(autor: any);
    findById(comentarioId: any);
	save(comentario: Comentario): Promise<Comentario>;
    getComentarios();
}