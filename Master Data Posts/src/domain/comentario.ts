import { Result } from "../core/logic/Result";
import { List } from "lodash";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { User } from "./user";
import { ComentarioId } from "./comentarioId";
import { IComentarioDTO } from "../dto/IComentarioDTO";

interface ComentarioProps {
  autor: User;
  texto: string;
  likes: List<User>;
  dislikes: List<User>;
}

export class Comentario extends AggregateRoot<ComentarioProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get comentarioId(): ComentarioId {
    return new ComentarioId(this.comentarioId.toValue());
  }
  
  get autor (): User {
    return this.props.autor;
  }

  get texto (): string {
    return this.props.texto;
  }

  get likes (): List<User> {
    return this.props.likes;
  }

  get dislikes (): List<User> {
    return this.props.dislikes;
  }
  
  private constructor (props: ComentarioProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(comentarioDTO: IComentarioDTO, id?: UniqueEntityID): Result<Comentario> {
    const autor = comentarioDTO.autor;
    const texto = comentarioDTO.texto;
    const likes = comentarioDTO.likes;
    const dislikes = comentarioDTO.dislikes;

    if (!!texto === false || texto.length === 0) {
        return Result.fail<Comentario>('Must provide texto')
    } else {
        const post = new Comentario({ autor: autor, texto: texto, likes: likes, dislikes: dislikes }, id);
        return Result.ok<Comentario>(post)
    }
  }
}