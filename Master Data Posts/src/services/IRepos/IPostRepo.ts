import { List } from "lodash";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Repo } from "../../core/infra/Repo";
import { ComentarioId } from "../../domain/comentarioId";
import { Post } from "../../domain/post";
import { PostId } from "../../domain/postId";


export default interface IPostRepo extends Repo<Post>{
    updateLikePost(id: UniqueEntityID, likes: List<string>);
    updateDislikePost(id: UniqueEntityID, dislikes: List<string>);
    delete(id: string);
    getPostsByEmail(key: any);
    save(post:Post):Promise<Post>;
    findById(postId: PostId|string): Promise<Post>;
    getPosts();
    populate(post: Post,comentarioId : string | ComentarioId):Promise<Post>;
    atualizaComentarios(idPost: any, list: any);
}