import { Service, Inject } from "typedi";

import IPostRepo from "../services/IRepos/IPostRepo";
import { Post } from "../domain/post";
import { PostId } from "../domain/postId";
import { PostMap } from "../mappers/PostMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPostPersistence } from "../dataschema/IPostSchema";
import roleRoute from "../api/routes/roleRoute";

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
}