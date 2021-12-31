import { Service, Inject } from "typedi";
import config from "../../config";
import IPostDTO from "../dto/IPostDTO";
import { Post } from "../domain/post";
import IPostRepo from "./IRepos/IPostRepo";
import IPostService from "./IServices/IPostService";
import { Result } from "../core/logic/Result";
import { PostMap } from "../mappers/PostMap";

@Service()
export default class PostService implements IPostService {
    constructor(
        @Inject(config.repos.post.name) private postRepo: IPostRepo
    ) { }

    public async getPosts(): Promise<Result<IPostDTO[]>> {
        try {
            const posts = (await this.postRepo.getPosts()).getValue();
            return Result.ok<Array<IPostDTO>>(posts);
        } catch(e){
            throw e;
        }
    }

    public async getPostsByEmail(key: any) : Promise<Result<IPostDTO[]>> {
        try {
            const posts = (await this.postRepo.getPostsByEmail(key)).getValue();
            return Result.ok<Array<IPostDTO>>(posts);
        } catch(e){
            throw e;
        }
    }

    public async createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try{

            const postOrError = await Post.create(postDTO);

            if(postOrError.isFailure){
                return Result.fail<IPostDTO>(postOrError.errorValue());
            }

            const postResult = postOrError.getValue();

            await this.postRepo.save(postResult);

            const postDTOResult = PostMap.toDTO(postResult) as IPostDTO;
            return Result.ok<IPostDTO>(postDTOResult)
        } catch(e){
            throw e;
        }
    }

    public async updatePost(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try{
            const post = await this.postRepo.findById(postDTO.id);

            if(post === null){
                return Result.fail<IPostDTO>("Post not found");
            } else{
                post.description = postDTO.description;
                await this.postRepo.save(post);

                const postDTOResult = PostMap.toDTO(post) as IPostDTO;

                return Result.ok<IPostDTO>(postDTOResult)
            }
        } catch(e){
            throw e;
        }
    }
}