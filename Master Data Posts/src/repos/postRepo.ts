import { Service, Inject } from "typedi";

import IPostRepo from "../services/IRepos/IPostRepo";
import { Post } from "../domain/post";
import { PostId } from "../domain/postId";
import { PostMap } from "../mappers/PostMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPostPersistence } from "../dataschema/IPostPersistence";
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
                postDocument.listaComentarios = post.listaComentarios;
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
        const query = { _id: postId };
        const postRecord = await this.postSchema.findById(query);

        if (postRecord != null) {
            return PostMap.toDomain(postRecord);
        } else
            return null;
    }

    public async getPostsByEmail(key: any) {

        const query = { email: key };
        var posts = [];
        const document = await this.postSchema.find(query);
        if (document === null) {
            return Result.fail<Array<IPostDTO>>("No Posts Found!");
        } else {
            for (var i = 0; i < document.length; i++) {
                posts.push(PostMap.toDTO(PostMap.toDomain(document[i])));
            }
            return Result.ok<Array<IPostDTO>>(posts);
        }
    }

    public async getPosts() {
        const document = await this.postSchema.find();
        var posts = [];
        if (document === null) {
            return Result.fail<Array<IPostDTO>>("No Posts Found!");
        } else {
            for (var i = 0; i < document.length; i++) {
                posts.push(PostMap.toDTO(PostMap.toDomain(document[i])));
            }
            return Result.ok<Array<IPostDTO>>(posts);
        }
    }

    public async populate(post: Post, comentarioId: string): Promise<Post> {

        post.listaComentarios.push(comentarioId);
        this.postSchema.findById({ _id: post.id }, function (err, doc) {
            doc.listaComentarios = post.listaComentarios;
            doc.save();
        });
        if (post != null) {
            return PostMap.toDomain(post);
        } else {
            return null;
        }
    }

    /** const query = { email: key };
        var posts = [];
        const document = await this.postSchema.find(query);
        if (document === null) {
            return Result.fail<Array<IPostDTO>>("No Posts Found!");
        } else {
            for (var i = 0; i < document.length; i++) {
                posts.push(PostMap.toDTO(PostMap.toDomain(document[i])));
            }
            return Result.ok<Array<IPostDTO>>(posts);
        } */

    public async atualizaComentarios(idPost: any, list: any) {

        var document = await this.postSchema.updateOne({ id: idPost }, { $set: { listaComentarios: list } });

        if (document != null) {
            return Result.ok(document);
        } else {
            return Result.fail<IPostDTO>("Error!");;
        }
    }

    public async delete(id: string) {
        const query = { id: id };
        const document = await this.postSchema.deleteOne(query);
        if (document === null) {
            return Result.fail<IPostDTO>("No posts found!");
        } else {
            return Result.ok();
        }
    }
}