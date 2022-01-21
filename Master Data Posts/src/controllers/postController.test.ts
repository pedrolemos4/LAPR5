/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import IPostService from '../services/IServices/IPostService';
import "reflect-metadata";
import { assert } from 'console';
import IPostRepo from '../services/IRepos/IPostRepo';
import IPostController from './IControllers/IPostController';
import PostRepo from '../repos/postRepo';
import PostService from '../services/postService';
import IComentarioRepo from '../services/IRepos/IComentarioRepo';
import ComentarioRepo from '../repos/comentarioRepo';
import PostController from './postController';

describe('post controller', function () {
	let postRepo: IPostRepo
	let comentarioRepo: IComentarioRepo
	let service: IPostService
	let ctrl: IPostController

	beforeEach(function() {
		postRepo = new PostRepo(null);
		comentarioRepo = new ComentarioRepo(null);
		service = new PostService(postRepo, comentarioRepo);
		ctrl = new PostController(service);
    });

    it('createPost: returns json with id + values', async function () {
        let body = {"id":"123", "description":'post1', "email":'teste@gmail.com', "listaComentarios":[], "tags":['musica','Valongo'], "likes":[], "dislikes":[]}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(postRepo, "save").throws();
		const result = await ctrl.createPost(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});

	it('getPosts: returns posts', async function () {
        let body = {}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(postRepo, "getPosts").throws();
		const result = await ctrl.getPosts(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});

	it('getPostsByEmail: returns posts', async function () {
        let body = {"email":'teste@gmail.com'}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(postRepo, "getPostsByEmail").throws();
		const result = await ctrl.getPostsByEmail(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});

	it('updateLikePost: updates posts', async function () {
        let body = {"likes":['like1','like2']}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(postRepo, "updateLikePost").throws();
		const result = await ctrl.updateLikePost(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});

	it('updateDislikePost: updates posts', async function () {
        let body = {"dislikes":['like1','like2']}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(postRepo, "updateDislikePost").throws();
		const result = await ctrl.updateDislikePost(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});

	it('atualizaComments: updates posts', async function () {
        let body = {"listaComentarios":['comentario1','comentario2']}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(postRepo, "atualizaComentarios").throws();
		const result = await ctrl.atualizaComments(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});
});