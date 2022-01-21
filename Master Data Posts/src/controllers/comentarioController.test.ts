/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import "reflect-metadata";
import { assert } from 'console';
import PostRepo from '../repos/postRepo';
import IComentarioRepo from '../services/IRepos/IComentarioRepo';
import ComentarioRepo from '../repos/comentarioRepo';
import ComentarioService from '../services/comentarioService';
import IPostRepo from '../services/IRepos/IPostRepo';
import IComentarioService from '../services/IServices/IComentarioService';
import IComentarioController from './IControllers/IComentarioController';
import ComentarioController from './comentarioController';

describe('comentario controller', function () {
	let postRepo: IPostRepo
	let comentarioRepo: IComentarioRepo
	let service: IComentarioService
	let ctrl: IComentarioController

	beforeEach(function() {
		postRepo = new PostRepo(null);
		comentarioRepo = new ComentarioRepo(null);
		service = new ComentarioService(comentarioRepo, postRepo);
		ctrl = new ComentarioController(service);
    });

    it('createComentario: returns json with id + values', async function () {
        let body = {"id":"456", "autor":'teste2@gmail.com', "post":'123', "texto":'resposta teste', "tags":["musica"] ,"likes":[], "dislikes":[]}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(comentarioRepo, "save").throws();
		const result = await ctrl.createComentario(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});

	it('getComentarios: returns comments', async function () {
        let body = {}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(comentarioRepo, "getComentarios").throws();
		const result = await ctrl.getComentarios(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});

	it('getComentarioByAutor: returns comments', async function () {
        let body = {"autor":'teste2@gmail.com'}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(comentarioRepo, "findByAutor").throws();
		const result = await ctrl.getComentarioByAutor(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});

	it('getComentarioById: returns comment', async function () {
        let body = {"id":"456"}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(comentarioRepo, "findById").throws();
		const result = await ctrl.getComentarioById(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});

	it('updateLikes: updates comment', async function () {
        let body = {"id":"456", "autor":'teste2@gmail.com', "post":'123', "texto":'resposta teste', "tags":["musica"] ,"likes":["like1","like2"], "dislikes":[]}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(comentarioRepo, "updateLikes").throws();
		const result = await ctrl.updateLikes(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});

	it('updateDislikes: updates comment', async function () {
        let body = {"id":"456", "autor":'teste2@gmail.com', "post":'123', "texto":'resposta teste', "tags":["musica"] ,"likes":[], "dislikes":["dislike1","dislike2"]}
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy(),
			status: sinon.spy(),
        };
		let next: Partial<NextFunction> = () => {return true};

		sinon.stub(comentarioRepo, "updateDislikes").throws();
		const result = await ctrl.updateDislikes(<Request>req, <Response>res, <NextFunction>next);
		assert(result);
	});
});