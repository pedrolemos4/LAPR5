/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
import { Service, Inject } from 'typedi';

import IComentarioRepo from "../services/IRepos/IComentarioRepo";
import { Role } from "../domain/role";
import { RoleId } from "../domain/roleId";
import { RoleMap } from "../mappers/RoleMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';
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
    const roleDocument = await this.comentarioSchema.findOne( query as FilterQuery<IComentarioPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save (comentario: Comentario): Promise<Comentario> {
    const query = { domainId: comentario.id.toString()}; 

    const roleDocument = await this.comentarioSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawRole: any = ComentarioMap.toPersistence(comentario);

        const roleCreated = await this.comentarioSchema.create(rawRole);

        //return RoleMap.toDomain(roleCreated);
      } else {
        roleDocument.texto = comentario.texto;
        await roleDocument.save();

        return comentario;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findById (comentarioId: ComentarioId | string): Promise<Comentario> {

    const idX = comentarioId instanceof ComentarioId ? (<ComentarioId>comentarioId).id.toValue() : comentarioId;

    const query = { domainId: idX }; 
    const userRecord = await this.comentarioSchema.findOne( query );

    if( userRecord != null) {
      return ComentarioMap.toDomain(userRecord);
    }
    else
      return null;
  }
}