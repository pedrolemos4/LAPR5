import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import { Container } from 'typedi';
import IPostController from "../../controllers/IControllers/IPostController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/posts', route);

    const ctrl = Container.get(config.controllers.post.name) as IPostController;

    route.get('', (req, res, next) => ctrl.getPosts(req, res, next));

    route.get('/getPostsByEmail', (req, res, next) => ctrl.getPostsByEmail(req, res, next));

    route.put('/atualizaComments', celebrate({
        body: Joi.object({
            domainId: Joi.array().items(Joi.string())
            //domainId: Joi.string().required(),
        })
    }), (req, res, next) => ctrl.atualizaComments(req, res, next));

    route.post('',
        celebrate({
            body: Joi.object({
                description: Joi.string().required(),
                email: Joi.string().required(),
                tags: Joi.array().items(Joi.string()),
                likes: Joi.array().items(Joi.string()),
                dislikes: Joi.array().items(Joi.string())
            })
        }),
        (req, res, next) => ctrl.createPost(req, res, next));

    route.put('/updateLikes',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                description: Joi.string().required(),
                email: Joi.string().required(),
                listaComentarios: Joi.array().items(Joi.string()),
                likes: Joi.array().items(Joi.string()),
                dislikes: Joi.array().items(Joi.string())
            })
        }),
        (req, res, next) => ctrl.updateLikePost(req, res, next));

    route.put('/updateDislikes',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                description: Joi.string().required(),
                email: Joi.string().required(),
                listaComentarios: Joi.array().items(Joi.string()),
                likes: Joi.array().items(Joi.string()),
                dislikes: Joi.array().items(Joi.string())
            })
        }),
        (req, res, next) => ctrl.updateDislikePost(req, res, next));

    route.delete('/delete', (req, res, next) => ctrl.delete(req, res, next));
};