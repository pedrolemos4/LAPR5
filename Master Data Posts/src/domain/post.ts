import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IPostDTO from "../dto/IPostDTO";

import { Result } from "../core/logic/Result";
import { PostId } from "./postId";
import { List } from "lodash";

interface PostProps {
    description: string;
    email: string;
    listaComentarios: string[];
    tags: List<string>;
    likes: List<string>;
    dislikes: List<string>;
}
export class Post extends AggregateRoot<PostProps>{
    get id(): UniqueEntityID {
        return this._id;
    }

    get postId(): PostId {
        return new PostId(this.postId.toValue());
    }

    get description(): string {
        return this.props.description;
    }

    get email():string{
        return this.props.email;
    }

    get listaComentarios():string[]{
        return this.props.listaComentarios;
    }

    set listaComentarios(value: string[]){
        this.props.listaComentarios = value;
    }

    get likes():List<string>{
        return this.props.likes;
    }

    set likes(value: List<string>){
        this.props.likes = value;
    }

    get dislikes():List<string>{
        return this.props.dislikes;
    }

    set dislikes(value: List<string>){
        this.props.dislikes = value;
    }
    
    set description(value: string) {
        this.props.description = value;
    }

    set email(value: string){
        this.props.email = value;
    }

    get tags(): List<string>{
        return this.props.tags;
    }
    
    set tags(value: List<string>){
        this.props.tags= value;
        
    }
    private constructor(props: PostProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(postDTO: IPostDTO, id?: UniqueEntityID): Result<Post> {
        const description = postDTO.description;
        const email = postDTO.email;
        const listaComentarios = postDTO.listaComentarios;
        const tags = postDTO.tags;
        const likes = postDTO.likes;
        const dislikes = postDTO.dislikes;

        if (!!description === false || description.length === 0) {
            return Result.fail<Post>('Must provide description')
        } else {
            const post = new Post({ description: description , email : email, listaComentarios : listaComentarios,tags: tags, likes : likes, dislikes: dislikes }, id);
            return Result.ok<Post>(post)
        }
    }

}