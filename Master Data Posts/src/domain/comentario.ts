import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { List } from "lodash";
import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { User } from "./user";

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

  public static create (props: ComentarioProps, id?: UniqueEntityID): Result<Comentario> {

    const guardedProps = [
        { argument: props.autor, argumentName: 'autor' },
        { argument: props.texto, argumentName: 'texto' },
        { argument: props.likes, argumentName: 'likes' },
        { argument: props.dislikes, argumentName: 'dislikes' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Comentario>(guardResult.message)
    }     
    else {
      const comentario = new Comentario({
        ...props
      }, id);

      return Result.ok<Comentario>(comentario);
    }
  }
}