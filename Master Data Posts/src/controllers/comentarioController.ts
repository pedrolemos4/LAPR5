import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { IComentarioDTO } from '../dto/IComentarioDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IComentarioController from './IControllers/IComentarioController';
import IComentarioService from '../services/IServices/IComentarioService';


@Service()
export default class ComentarioController implements IComentarioController {
    constructor(
        @Inject(config.services.comentario.name) private comentarioServiceInstance : IComentarioService
    ){}

    public async createComentario(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const comentarioOrError = await this.comentarioServiceInstance.createComentario(req.body as IComentarioDTO) as Result<IComentarioDTO>;

            if(comentarioOrError.isFailure){
                return res.status(402).send();
            }

            const comentarioDTO = comentarioOrError.getValue();
            return res.json(comentarioDTO).status(201);
        }
        catch (e){
            return next(e);
        }
    };
}