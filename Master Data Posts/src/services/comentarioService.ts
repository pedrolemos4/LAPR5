import { Service, Inject } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IComentarioService from "./IServices/IComentarioService";
import { IComentarioDTO } from "../dto/IComentarioDTO";
import { Comentario } from "../domain/comentario";
import { ComentarioMap } from "../mappers/ComentarioMap";
import IComentarioRepo from "./IRepos/IComentarioRepo";

@Service()
export default class ComentarioService implements IComentarioService {
    constructor(
        @Inject(config.repos.comentario.name) private comentarioRepo: IComentarioRepo
    ) { }

    public async getComentario(comentarioId: string): Promise<Result<IComentarioDTO>> {
        try {
            const comentario = await this.comentarioRepo.findById(comentarioId);

            if (comentario === null) {
                return Result.fail<IComentarioDTO>("Comentario not found");
            } else {
                const comentarioDTOResult = ComentarioMap.toDTO(comentario) as IComentarioDTO;
                return Result.ok<IComentarioDTO>(comentarioDTOResult)
            }
        } catch(e){
            throw e;
        }
    }

    public async createComentario(comentarioDTO: IComentarioDTO): Promise<Result<IComentarioDTO>> {
        try{

            const comentarioOrError = await Comentario.create(comentarioDTO);

            if(comentarioOrError.isFailure){
                return Result.fail<IComentarioDTO>(comentarioOrError.errorValue());
            }

            const comentarioResult = comentarioOrError.getValue();

            await this.comentarioRepo.save(comentarioResult);

            const comentarioDTOResult = ComentarioMap.toDTO(comentarioResult) as IComentarioDTO;
            return Result.ok<IComentarioDTO>(comentarioDTOResult)
        } catch(e){
            throw e;
        }
    }
}