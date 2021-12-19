import { Response, Request } from 'express';

import { Container} from 'typedi';

import config from '../../config';

import IComentarioRepo from '../services/IRepos/IComentarioRepo';
import { ComentarioMap } from '../mappers/ComentarioMap';
import { IComentarioDTO } from '../dto/IComentarioDTO';


exports.getMe = async function(req, res: Response) {
  
    // NB: a arquitetura ONION não está a ser seguida aqui

    const comentarioRepo = Container.get(config.repos.comentario.name) as IComentarioRepo

    if( !req.token || req.token == undefined )
        return res.json( new Error("Token inexistente ou inválido")).status(401);

    const comentario = await comentarioRepo.findById( req.token.id );
    if (!comentario)
        return res.json( new Error("Comentario não registado")).status(401);

    const comentarioDTO = ComentarioMap.toDTO( comentario ) as IComentarioDTO;
    return res.json( comentarioDTO ).status(200);
}