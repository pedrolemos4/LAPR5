import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IPostDTO from "../dto/IPostDTO";

import { Result } from "../core/logic/Result";
import { PostId } from "./postId";

interface PostProps {
    description: string;
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

    set description(value: string) {
        this.props.description = value;
    }

    private constructor(props: PostProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(postDTO: IPostDTO, id?: UniqueEntityID): Result<Post> {
        const description = postDTO.description;

        if (!!description === false || description.length === 0) {
            return Result.fail<Post>('Must provide description')
        } else {
            const post = new Post({ description: description }, id);
            return Result.ok<Post>(post)
        }
    }

}