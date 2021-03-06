import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import { Container } from 'typedi';
import IComentarioController from "../../controllers/IControllers/IComentarioController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/comentarios', route);

    const ctrl = Container.get(config.controllers.comentario.name) as IComentarioController;

    route.get('', (req, res, next) => ctrl.getComentarios(req, res, next));

    route.get('/getById', (req, res, next) => ctrl.getComentarioById(req, res, next));

    route.get('/getComentariosByAutor', (req, res, next) => ctrl.getComentarioByAutor(req, res, next));

    route.delete('/delete', (req, res, next) => ctrl.delete(req, res, next));

    route.post('',
        celebrate({
            body: Joi.object({
                autor: Joi.string().required(),
                post: Joi.string().required(),
                texto: Joi.string().required(),
                tags: Joi.array().items(Joi.string()),
                likes: Joi.array().items(Joi.string()),
                dislikes: Joi.array().items(Joi.string())
            })
        }),
        (req, res, next) => ctrl.createComentario(req, res, next));

    route.put('/updateLikes',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                autor: Joi.string().required(),
                post: Joi.string().required(),
                texto: Joi.string().required(),
                tags: Joi.array().items(Joi.string()),
                likes: Joi.array().items(Joi.string()),
                dislikes: Joi.array().items(Joi.string())
            })
        }),
        (req, res, next) => ctrl.updateLikes(req, res, next));

    route.put('/updateDislikes',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                autor: Joi.string().required(),
                post: Joi.string().required(),
                texto: Joi.string().required(),
                tags: Joi.array().items(Joi.string()),
                likes: Joi.array().items(Joi.string()),
                dislikes: Joi.array().items(Joi.string())
            })
        }),
        (req, res, next) => ctrl.updateDislikes(req, res, next));
};
