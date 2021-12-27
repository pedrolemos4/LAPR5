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


    public async getComentarios(): Promise<Result<IComentarioDTO[]>> {
        try {
            const comentarios = (await this.comentarioRepo.getComentarios()).getValue();
            return Result.ok<IComentarioDTO[]>(comentarios);
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