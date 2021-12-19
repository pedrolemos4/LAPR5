import { Router } from "express";

import { celebrate, Joi } from "celebrate";

import { Container } from 'typedi';
import IComentarioController from "../../controllers/IControllers/IComentarioController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/comentarios', route);

    const ctrl = Container.get(config.controllers.comentario.name) as IComentarioController;

    route.post('',
        celebrate({
            body: Joi.object({
                autor: Joi.string().required(),
                texto: Joi.string().required(),
                likes: Joi.string(),
                dislikes: Joi.string()
            })
        }),
        (req, res, next) => ctrl.createComentario(req, res, next));
};
