/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

import { Mapper } from "../core/infra/Mapper";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Comentario } from '../domain/comentario';
import { IComentarioDTO } from '../dto/IComentarioDTO';
import { IComentarioPersistence } from "../dataschema/IComentarioPersistence";
import { Document, Model } from "mongoose";

export class ComentarioMap extends Mapper<Comentario> {

  public static toDTO( comentario: Comentario): IComentarioDTO {
    return {
      //id: user.id.toString(),
      autor: comentario.autor,
      texto: comentario.texto,
      likes: comentario.likes,
      dislikes: comentario.dislikes
    } as IComentarioDTO;
  }

  public static toDomain (comentario: any | Model<IComentarioPersistence & Document>):Comentario {

    const comentarioOrError = Comentario.create({
      autor: comentario.autor,
      texto: comentario.texto,
      likes: comentario.likes,
      dislikes: comentario.dislikes
    }, new UniqueEntityID(comentario.domainId))

    comentarioOrError.isFailure ? console.log(comentarioOrError.error) : '';
    
    return comentarioOrError.isSuccess ? comentarioOrError.getValue() : null;
  }

  public static toPersistence (comentario: Comentario): any {
    const a = {
        id: comentario.id.toString(),
        autor: comentario.autor,
        texto: comentario.texto,
        likes: comentario.likes,
        dislikes: comentario.dislikes
    }
    return a;
  }
}