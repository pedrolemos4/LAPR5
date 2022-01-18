import { List } from "lodash";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Repo } from "../../core/infra/Repo";
import { Comentario } from "../../domain/comentario";

export default interface IComentarioRepo extends Repo<Comentario> {
    findByComentarioId(id: string);
    updateDislikes(id: UniqueEntityID, dislikes: List<string>);
    updateLikes(id: UniqueEntityID, likes: List<string>);
    getDomainId(id: any);
    delete(id: string);
    findByAutor(autor: any);
    findById(comentarioId: any);
	save(comentario: Comentario): Promise<Comentario>;
    getComentarios();
}