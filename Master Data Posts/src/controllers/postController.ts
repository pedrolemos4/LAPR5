import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPostController from './IControllers/IPostController';
import IPostService from '../services/IServices/IPostService';
import IPostDTO from '../dto/IPostDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class PostController implements IPostController {
    constructor(
        @Inject(config.services.post.name) private postServiceInstance: IPostService
    ) { }

    public async getPosts(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const postOrError = await this.postServiceInstance.getPosts();

            if (postOrError.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(postOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async getPostsByEmail(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            console.log(req.query.param);
            const postOrError = await this.postServiceInstance.getPostsByEmail(req.query.param);

            if (postOrError.isFailure) {
                return res.status(402).send();
            }

            return res.status(201).json(postOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async createPost(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const postOrError = await this.postServiceInstance.createPost(req.body as IPostDTO) as Result<IPostDTO>;

            if (postOrError.isFailure) {
                return res.status(402).send();
            }

            const postDTO = postOrError.getValue();
            return res.json(postDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async updatePost(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const postOrError = await this.postServiceInstance.updatePost(req.body as IPostDTO) as Result<IPostDTO>;

            if (postOrError.isFailure) {
                return res.status(404).send();
            }

            const postDTO = postOrError.getValue();
            return res.status(201).json(postDTO);
        } catch (e) {
            return next(e);
        }
    };

    public async atualizaComments(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            var idPost = req.body.split('/')[0];
            var idComentario = req.body.split('/')[1];

            const postAtualizadoOrError = await this.postServiceInstance.atualizaComments(idPost, idComentario) as Result<IPostDTO>;

            if (postAtualizadoOrError.isFailure) {
                return res.status(404).send();
            }

            const postDTO = postAtualizadoOrError.getValue();
            return res.status(201).json(postDTO);

        } catch (e) {
            return next(e);
        }
    }

    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const comentarioOrError = this.postServiceInstance.delete(req.query.param);

            if (comentarioOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(201).json("Eliminado com sucesso."); //Corrigir para ok
        }
        catch (e) {
            return next(e);
        }
    }
}