import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { IComentarioDTO } from '../dto/IComentarioDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IComentarioController from './IControllers/IComentarioController';
import IComentarioService from '../services/IServices/IComentarioService';
import { Comentario } from '../domain/comentario';
import IEmailDTO from '../dto/IEmailDTO';
import IIdDTO from '../dto/IIdDTO';


@Service()
export default class ComentarioController implements IComentarioController {
    constructor(
        @Inject(config.services.comentario.name) private comentarioServiceInstance: IComentarioService
    ) { }

    public async getComentarios(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const comentarioOrError = await this.comentarioServiceInstance.getComentarios();

            if (comentarioOrError.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(comentarioOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async getComentarioByAutor(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const comentarioOrError = await this.comentarioServiceInstance.getComentarioByAutor(req.query.param);

            if (comentarioOrError.isFailure) {
                return res.status(402).send();
            }

            const comentarioDTO = comentarioOrError.getValue();
            return res.status(201).json(comentarioDTO);
        }
        catch (e) {
            return next(e);
        }
    }

    public async getComentarioById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const comentarioOrError = await this.comentarioServiceInstance.getComentarioById(req.query.id);

            if (comentarioOrError.isFailure) {
                return res.status(404).send();
            }

            const comentarioDTO = comentarioOrError.getValue();
            return res.status(201).json(comentarioDTO);
        }
        catch (e) {
            return next(e);
        }
    }

    public async createComentario(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const comentarioOrError = await this.comentarioServiceInstance.createComentario(req.body as IComentarioDTO) as Result<IComentarioDTO>;

            if (comentarioOrError.isFailure) {
                return res.status(402).send();
            }

            const comentarioDTO = comentarioOrError.getValue();
            return res.json(comentarioDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const comentarioOrError = this.comentarioServiceInstance.delete(req.query.param);

            if (comentarioOrError.isFailure) {
                return res.status(404).send();
            }

            return res.json("Eliminado com sucesso.").status(201); //Corrigir para ok
        }
        catch (e) {
            return next(e);
        }
    }
}