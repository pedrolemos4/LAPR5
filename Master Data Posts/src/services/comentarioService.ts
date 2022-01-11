import { Service, Inject } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IComentarioService from "./IServices/IComentarioService";
import { IComentarioDTO } from "../dto/IComentarioDTO";
import { Comentario } from "../domain/comentario";
import { ComentarioMap } from "../mappers/ComentarioMap";
import IComentarioRepo from "./IRepos/IComentarioRepo";
import IPostRepo from "./IRepos/IPostRepo";

@Service()
export default class ComentarioService implements IComentarioService {
    constructor(
        @Inject(config.repos.comentario.name) private comentarioRepo: IComentarioRepo,
        @Inject(config.repos.post.name) private postRepo: IPostRepo
    ) { }


    public async getComentarios(): Promise<Result<IComentarioDTO[]>> {
        try {
            const comentarios = (await this.comentarioRepo.getComentarios()).getValue();
            return Result.ok<IComentarioDTO[]>(comentarios);
        } catch (e) {
            throw e;
        }
    }

    public async getComentarioById(comentarioId: string): Promise<Result<Comentario>> {
        const comentario = await this.comentarioRepo.findById(comentarioId);
        const found = !!comentario;

        if (found) {
            return Result.ok<Comentario>(comentario);
        } else {
            return Result.fail<Comentario>("Couldn't find comentario by id=" + comentarioId);
        }
    }

    public async getComentarioByAutor(autor: any): Promise<Result<IComentarioDTO[]>> {
        try {
            var newKey = Object.values(autor)[0];
            const comentario = (await this.comentarioRepo.findByAutor(newKey)).getValue();
            return Result.ok<Array<IComentarioDTO>>(comentario);
        } catch (e) {
            throw e;
        }
    }

    public async createComentario(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>> {
        try {

            const comentarioOrError = await Comentario.create(comentarioDTO);

            if (comentarioOrError.isFailure) {
                return Result.fail<IComentarioDTO>(comentarioOrError.errorValue());
            }

            const comentarioResult = comentarioOrError.getValue();

            await this.comentarioRepo.save(comentarioResult);
            const id = comentarioResult.post.replace(/\'/g, "");
            const post = await this.postRepo.findById(id);

            await this.postRepo.populate(post, comentarioResult.id.toString());

            const comentarioDTOResult = ComentarioMap.toDTO(comentarioResult) as IComentarioDTO;
            return Result.ok<IComentarioDTO>(comentarioDTOResult)
        } catch (e) {
            throw e;
        }
    }
}