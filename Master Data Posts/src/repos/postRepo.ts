import { Service, Inject } from "typedi";

import IPostRepo from "../services/IRepos/IPostRepo";
import { Post } from "../domain/post";
import { PostId } from "../domain/postId";
import { PostMap } from "../mappers/PostMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPostPersistence } from "../dataschema/IPostPersistence";
import roleRoute from "../api/routes/roleRoute";
import { Result } from "../core/logic/Result";
import IPostDTO from "../dto/IPostDTO";

@Service()
export default class PostRepo implements IPostRepo {
    private models: any;

    constructor(
        @Inject('postSchema') private postSchema: Model<IPostPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(post: Post): Promise<boolean> {
        const idX = post.id instanceof PostId ? (<PostId>post.id).toValue() : post.id;

        const query = { domainId: idX };
        const postDocument = await this.postSchema.findOne(query as FilterQuery<IPostPersistence & Document>);
        return !!postDocument === true;
    }

    public async save(post: Post): Promise<Post> {
        const query = { domainId: post.id.toString() };

        const postDocument = await this.postSchema.findOne(query);

        try {
            if (postDocument === null) {
                const rawRole: any = PostMap.toPersistence(post);

                const postCreated = await this.postSchema.create(rawRole);

                return PostMap.toDomain(postCreated);
            } else {
                postDocument.description = post.description;
                postDocument.email = post.email;
                postDocument.likes = post.likes;
                postDocument.dislikes = post.dislikes;
                await postDocument.save();

                return post;
            }

        } catch (err) {
            throw err;
        }
    }

    public async findById(postId: string | PostId): Promise<Post> {
        const query = { domainId: postId };
        const postRecord = await this.postSchema.findOne(query as FilterQuery<IPostPersistence & Document>);

        if (postRecord != null) {
            return PostMap.toDomain(postRecord);
        } else
            return null;
    }

    public async getPosts(){
        const document = await this.postSchema.find();
        var posts = [] ;
        if(document === null){
            return Result.fail<Array<IPostDTO>>("No Posts Found!");
        } else{
            for(var i =0;i<document.length;i++){
                posts.push(PostMap.toDTO(PostMap.toDomain(document[i])));
            }
            return Result.ok<Array<IPostDTO>>(posts);
        }
    }
}