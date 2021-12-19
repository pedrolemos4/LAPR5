/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../domain/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/userEmail";
import { UserPassword } from "../domain/userPassword";

import RoleRepo from "../repos/roleRepo";
import { Comentario } from '../domain/comentario';
import { IComentarioDTO } from '../dto/IComentarioDTO';
import ComentarioRepo from '../repos/comentarioRepo';

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

  public static async toDomain (raw: any): Promise<Comentario> {

    const userOrError = Comentario.create({
      autor: raw.autor,
      texto: raw.texto,
      likes: raw.likes,
      dislikes: raw.dislikes
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
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