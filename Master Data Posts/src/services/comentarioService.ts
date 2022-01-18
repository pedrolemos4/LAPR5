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

    public async getComentarioById(comentarioId: any): Promise<Result<IComentarioDTO>> {
        try {
            const comentario = (await this.comentarioRepo.findById(comentarioId)).getValue();
            return Result.ok<IComentarioDTO>(comentario);
        } catch (e) {
            throw e;
        }
    }

    public async getComentarioByAutor(autor: any): Promise<Result<IComentarioDTO[]>> {
        try {
            const comentario = (await this.comentarioRepo.findByAutor(autor)).getValue();
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

    public async delete(id: string) {
        try {
            const comentarios = (await this.comentarioRepo.delete(id)).getValue();
            return Result.ok(comentarios);
        } catch (e) {
            throw e;
        }
    }

    public async updateLikes(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>> {
        try {
            const comentario = (await this.comentarioRepo.findByComentarioId(comentarioDTO.id)).getValue();
            if (comentario === null) {
                return Result.fail<IComentarioDTO>("Comentario not found");
            } else {
                await this.comentarioRepo.updateLikes(comentario.id, comentarioDTO.likes);

                const comentarioDTOResult = ComentarioMap.toDTO(comentario) as IComentarioDTO;

                return Result.ok<IComentarioDTO>(comentarioDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async updateDislikes(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>> {
        try {
            const comentario = (await this.comentarioRepo.findByComentarioId(comentarioDTO.id)).getValue();
            if (comentario === null) {
                return Result.fail<IComentarioDTO>("Comentario not found");
            } else {
                await this.comentarioRepo.updateDislikes(comentario.id, comentarioDTO.dislikes);

                const comentarioDTOResult = ComentarioMap.toDTO(comentario) as IComentarioDTO;

                return Result.ok<IComentarioDTO>(comentarioDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }
} 