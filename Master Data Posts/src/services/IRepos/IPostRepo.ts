import { Repo } from "../../core/infra/Repo";
import { ComentarioId } from "../../domain/comentarioId";
import { Post } from "../../domain/post";
import { PostId } from "../../domain/postId";


export default interface IPostRepo extends Repo<Post>{
    getPostsByEmail(key: any);
    save(post:Post):Promise<Post>;
    findById(postId: PostId|string): Promise<Post>;
    getPosts();
    populate(post: Post,comentarioId : string | ComentarioId):Promise<Post>;
}