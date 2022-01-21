/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */

import IPostDTO from "../../../src/dto/IPostDTO";
import { Post } from "../../../src/domain/post";

describe('post test', function () {
	beforeEach(function() {
    });

    const assert = require('assert');
    it('should create post', async function () {
        let body = {"id":"123", "description":'post1', "email":'teste@gmail.com', "listaComentarios":[], "tags":['musica','Valongo'], "likes":[], "dislikes":[]}
        const post = Post.create(body as IPostDTO);
        assert.equal(post.isSuccess, true);
	});

    it('should not create post - no description', async function () {
        let body = {"id":"123", "description":'', "email":'teste@gmail.com', "listaComentarios":[], "tags":['musica','Valongo'], "likes":[], "dislikes":[]}
        const post = Post.create(body as IPostDTO);
        assert.equal(post.isSuccess, false);
	});
});