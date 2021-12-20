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
export default class PostController implements IPostController{
    constructor(
        @Inject(config.services.post.name) private postServiceInstance : IPostService
    ){}

    public async createPost(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const postOrError = await this.postServiceInstance.createPost(req.body as IPostDTO) as Result<IPostDTO>;

            if(postOrError.isFailure){
                return res.status(402).send();
            }

            const postDTO = postOrError.getValue();
            return res.json(postDTO).status(201);
        }
        catch (e){
            return next(e);
        }
    };

    public async updatePost(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try{
            const postOrError = await this.postServiceInstance.updatePost(req.body as IPostDTO) as Result<IPostDTO>;

            if(postOrError.isFailure){
                return res.status(404).send();
            }

            const postDTO = postOrError.getValue();
            return res.status(201).json(postDTO);
        } catch(e){
            return next(e);
        }
    };
}