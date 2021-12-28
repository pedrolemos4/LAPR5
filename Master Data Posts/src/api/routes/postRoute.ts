import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import { Container } from 'typedi';
import IPostController from "../../controllers/IControllers/IPostController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/posts', route);

    const ctrl = Container.get(config.controllers.post.name) as IPostController;

    route.get('',(req,res,next)=> ctrl.getPosts(req,res,next));

    route.post('',
        celebrate({
            body: Joi.object({
                description: Joi.string().required(),
                email: Joi.string().required(),
                likes: Joi.array().items(Joi.string()),
                dislikes: Joi.array().items(Joi.string())
            })
        }),
        (req, res, next) => ctrl.createPost(req, res, next));

    route.put('',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                description: Joi.string().required(),
                email: Joi.string().required(),
                likes: Joi.array().items(Joi.string()),
                dislikes: Joi.array().items(Joi.string())
            }),
        }),
        (req, res, next) => ctrl.updatePost(req, res, next));
};