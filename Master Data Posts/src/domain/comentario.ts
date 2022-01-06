/* eslint-disable @typescript-eslint/no-use-before-define */
import { Result } from "../core/logic/Result";
import { List } from "lodash";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ComentarioId } from "./comentarioId";
import { IComentarioDTO } from "../dto/IComentarioDTO";

interface ComentarioProps {
  autor: string;
  post: string;
  texto: string;
  tags: List<string>;
  likes: List<string>;
  dislikes: List<string>;
}

export class Comentario extends AggregateRoot<ComentarioProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get comentarioId(): ComentarioId {
    return new ComentarioId(this.comentarioId.toValue());
  }
  
  get autor (): string {
    return this.props.autor;
  }

  get post (): string {
    return this.props.post;
  }

  get texto (): string {
    return this.props.texto;
  }

  get tags (): List<string> {
    return this.props.tags;
  }

  get likes (): List<string> {
    return this.props.likes;
  }

  get dislikes (): List<string> {
    return this.props.dislikes;
  }
  
  private constructor (props: ComentarioProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(comentarioDTO: IComentarioDTO, id?: UniqueEntityID): Result<Comentario> {

    const autor = comentarioDTO.autor;
    const post = comentarioDTO.post;
    const texto = comentarioDTO.texto;
    const tags = comentarioDTO.tags;
    const likes = comentarioDTO.likes;
    const dislikes = comentarioDTO.dislikes;

    if (!!texto === false || texto.length === 0) {
        return Result.fail<Comentario>('Must provide texto')
    } else {
        const comentario = new Comentario({ autor: autor, post: post, texto: texto, tags: tags, likes: likes, dislikes: dislikes }, id);
        return Result.ok<Comentario>(comentario)
    }
  }
}