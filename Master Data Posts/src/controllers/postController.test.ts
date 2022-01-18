/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import IPostDTO from '../dto/IPostDTO';
import PostController from './postController';
import IPostService from '../services/IServices/IPostService';
import "reflect-metadata";

describe('post controller', function () {
	beforeEach(function() {
    });

    it('createPost: returns json with id + values', async function () {
        let body = { "description":'post1', "email":'teste@gmail.com', "listaComentarios":'[]' ,"likes":'[]', "dislikes":'[]' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
        
		let postServiceClass = require(config.services.post.path).default;
		let postServiceInstance = Container.get(postServiceClass)
		Container.set(config.services.post.name, postServiceInstance);

		postServiceInstance = Container.get(config.services.post.name);
		sinon.stub(postServiceInstance, "createPost").returns( Result.ok<IPostDTO>( 
            {"id":"123", "description": req.body.description, "email": req.body.email, "listaComentarios": req.body.listaComentarios,
                "tags": req.body.tags,"likes": req.body.likes, "dislikes": req.body.dislikes} ));

		const ctrl = new PostController(postServiceInstance as IPostService);

		await ctrl.createPost(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"123","description": req.body.description, "email": req.body.email, 
        "listaComentarios": req.body.listaComentarios, "tags": req.body.tags,"likes": req.body.likes, "dislikes": req.body.dislikes}));
	});

    it('getPosts: returns posts', async function () {
        let body = "";
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let postServiceClass = require(config.services.post.path).default;
		let postServiceInstance = Container.get(postServiceClass)
		Container.set(config.services.post.name, postServiceInstance);

		postServiceInstance = Container.get(config.services.post.name);
		sinon.stub(postServiceInstance, "getPosts").returns( Result.ok<IPostDTO[]>());

		const ctrl = new PostController(postServiceInstance as IPostService);

		await ctrl.getPosts(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
	});
});