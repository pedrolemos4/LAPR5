/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
import { Service, Inject } from 'typedi';

import IComentarioRepo from "../services/IRepos/IComentarioRepo";

import { Document, FilterQuery, Model } from 'mongoose';
import { Comentario } from '../domain/comentario';
import { ComentarioMap } from '../mappers/ComentarioMap';
import { ComentarioId } from '../domain/comentarioId';
import { IComentarioPersistence } from '../dataschema/IComentarioPersistence';
import { Result } from '../core/logic/Result';
import { IComentarioDTO } from '../dto/IComentarioDTO';

@Service()
export default class ComentarioRepo implements IComentarioRepo {
  private models: any;

  constructor(
    @Inject('comentarioSchema') private comentarioSchema: Model<IComentarioPersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(comentario: Comentario): Promise<boolean> {

    const idX = comentario.id instanceof ComentarioId ? (<ComentarioId>comentario.id) : comentario.id;

    const query = { domainId: idX };
    const comentarioDocument = await this.comentarioSchema.findOne(query as FilterQuery<IComentarioPersistence & Document>);

    return !!comentarioDocument === true;
  }

  public async save(comentario: Comentario): Promise<Comentario> {
    const query = { domainId: comentario.id.toString() };

    const comentarioDocument = await this.comentarioSchema.findOne(query);

    try {
      if (comentarioDocument === null) {
        const rawComentario: any = ComentarioMap.toPersistence(comentario);

        const comentarioCreated = await this.comentarioSchema.create(rawComentario);

        return ComentarioMap.toDomain(comentarioCreated);
      } else {
        comentarioDocument.autor = comentario.autor;
        comentarioDocument.post = comentario.post;
        comentarioDocument.texto = comentario.texto;
        comentarioDocument.tags = comentario.tags;
        comentarioDocument.likes = comentario.likes;
        comentarioDocument.dislikes = comentario.dislikes;
        await comentarioDocument.save();

        return comentario;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findById(comentarioId: any) {
    const query = { domainId: comentarioId };
    const document = await this.comentarioSchema.find(query);
    if (document === null) {
      return Result.fail<Array<IComentarioDTO>>("No Comentarios Found!");
    } else {
      var comentario = ComentarioMap.toDTO(ComentarioMap.toDomain(document[0]));
      return Result.ok<IComentarioDTO>(comentario);
    }
  }

  public async findByAutor(autor: any) {
    const query = { autor: autor };
    var comentarios = [];
    const document = await this.comentarioSchema.find(query);
    if (document === null) {
      return Result.fail<IComentarioDTO[]>("No comments found!");
    } else {
      for (var i = 0; i < document.length; i++) {
        comentarios.push(ComentarioMap.toDTO(ComentarioMap.toDomain(document[i])));
      }
      return Result.ok<IComentarioDTO[]>(comentarios);
    }
  }

  public async getComentarios() {
    const document = await this.comentarioSchema.find();
    var comentarios = [];
    if (document === null) {
      return Result.fail<IComentarioDTO[]>("No Comentarios Found!");
    } else {
      for (var i = 0; i < document.length; i++) {
        comentarios.push(ComentarioMap.toDTO(ComentarioMap.toDomain(document[i])));
      }
      return Result.ok<IComentarioDTO[]>(comentarios);
    }
  }
}