import { Repo } from "../../core/infra/Repo";
import { Comentario } from "../../domain/comentario";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";

export default interface IComentarioRepo extends Repo<Comentario> {
    findById(id: any);
	save(comentario: Comentario): Promise<Comentario>;
}