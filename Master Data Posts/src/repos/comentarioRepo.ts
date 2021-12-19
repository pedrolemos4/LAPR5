/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
import { Service, Inject } from 'typedi';

import IComentarioRepo from "../services/IRepos/IComentarioRepo";

import { Document, FilterQuery, Model } from 'mongoose';
import { Comentario } from '../domain/comentario';
import { ComentarioMap } from '../mappers/ComentarioMap';
import { ComentarioId } from '../domain/comentarioId';
import { IComentarioPersistence } from '../dataschema/IComentarioPersistence';

@Service()
export default class ComentarioRepo implements IComentarioRepo {
  private models: any;

  constructor(
    @Inject('comentarioSchema') private comentarioSchema : Model<IComentarioPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(comentario: Comentario): Promise<boolean> {
    
    const idX = comentario.id instanceof ComentarioId ? (<ComentarioId>comentario.id) : comentario.id;

    const query = { domainId: idX}; 
    const comentarioDocument = await this.comentarioSchema.findOne( query as FilterQuery<IComentarioPersistence & Document>);

    return !!comentarioDocument === true;
  }

  public async save (comentario: Comentario): Promise<Comentario> {
    const query = { domainId: comentario.id.toString()}; 

    const comentarioDocument = await this.comentarioSchema.findOne( query );

    try {
      if (comentarioDocument === null ) {
        const rawRole: any = ComentarioMap.toPersistence(comentario);

        const comentarioCreated = await this.comentarioSchema.create(rawRole);

        return ComentarioMap.toDomain(comentarioCreated);
      } else {
        comentarioDocument.autor = comentario.autor;
        comentarioDocument.texto = comentario.texto;
        comentarioDocument.likes = comentario.likes;
        comentarioDocument.dislikes = comentario.dislikes;
        await comentarioDocument.save();

        return comentario;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findById (comentarioId: ComentarioId | string): Promise<Comentario> {

    const query = { domainId: comentarioId };
        const comentarioRecord = await this.comentarioSchema.findOne(query as FilterQuery<IComentarioPersistence & Document>);

        if (comentarioRecord != null) {
            return ComentarioMap.toDomain(comentarioRecord);
        } else
            return null;
      }
}