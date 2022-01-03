/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */

import { IComentarioDTO } from "../../../src/dto/IComentarioDTO";
import { Comentario } from "../../../src/domain/comentario";

describe('comentario test', function () {
	beforeEach(function() {
    });

    const assert = require('assert');
    it('should create comentario', async function () {
        let body = {"id":"456", "autor":'teste2@gmail.com', "post":'123', "texto":'resposta teste' ,"likes":[], "dislikes":[]}
        const comentario = Comentario.create(body as IComentarioDTO);
        assert.equal(comentario.isSuccess, true);
	});

    it('should not create comentario - no texto', async function () {
        let body = {"id":"456", "autor":'teste2@gmail.com', "post":'123', "texto":'' ,"likes":[], "dislikes":[]}
        const comentario = Comentario.create(body as IComentarioDTO);
        assert.equal(comentario.isSuccess, false);
	});
});