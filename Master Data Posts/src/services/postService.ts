import { Service, Inject } from "typedi";
import config from "../../config";
import IPostDTO from "../dto/IPostDTO";
import { Post } from "../domain/post";
import IPostRepo from "./IRepos/IPostRepo";
import IPostService from "./IServices/IPostService";
import { Result } from "../core/logic/Result";
import { PostMap } from "../mappers/PostMap";
import IComentarioRepo from "./IRepos/IComentarioRepo";
import IListDTO from "../dto/IListDTO";

@Service()
export default class PostService implements IPostService {
    constructor(
        @Inject(config.repos.post.name) private postRepo: IPostRepo,
        @Inject(config.repos.comentario.name) private comentRepo: IComentarioRepo
    ) { }

    public async getPosts(): Promise<Result<IPostDTO[]>> {
        try {
            const posts = (await this.postRepo.getPosts()).getValue();
            return Result.ok<Array<IPostDTO>>(posts);
        } catch (e) {
            throw e;
        }
    }

    public async getPostsByEmail(key: any): Promise<Result<IPostDTO[]>> {
        try {
            const posts = (await this.postRepo.getPostsByEmail(key)).getValue();
            return Result.ok<Array<IPostDTO>>(posts);
        } catch (e) {
            throw e;
        }
    }

    public async createPost(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try {

            const postOrError = await Post.create(postDTO);

            if (postOrError.isFailure) {
                return Result.fail<IPostDTO>(postOrError.errorValue());
            }

            const postResult = postOrError.getValue();

            await this.postRepo.save(postResult);

            const postDTOResult = PostMap.toDTO(postResult) as IPostDTO;
            return Result.ok<IPostDTO>(postDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async updateLikePost(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try {
            const post = await this.postRepo.findById(postDTO.id);
            if (post === null) {
                return Result.fail<IPostDTO>("Post not found");
            } else {
                await this.postRepo.updateLikePost(post.id, postDTO.likes);

                const postDTOResult = PostMap.toDTO(post) as IPostDTO;

                return Result.ok<IPostDTO>(postDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async updateDislikePost(postDTO: IPostDTO): Promise<Result<IPostDTO>> {
        try {
            const post = await this.postRepo.findById(postDTO.id);
            if (post === null) {
                return Result.fail<IPostDTO>("Post not found");
            } else {
                await this.postRepo.updateDislikePost(post.id, postDTO.dislikes);

                const postDTOResult = PostMap.toDTO(post) as IPostDTO;

                return Result.ok<IPostDTO>(postDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async atualizaComments(idComentario: IListDTO) {
        try {

            var post = (await this.postRepo.getPosts()).getValue();
            var arrayComentariosJogador = new Array<string>();
            idComentario.domainId.forEach(async (element: any) => {
                var x = this.comentRepo.getDomainId(element);
                arrayComentariosJogador.push(x);
            });

            if (post === null) {
                return Result.fail<Array<IPostDTO>>("Post not found");
            } else {
                post.forEach(async (element: Post) => {
                    var aux = new Array<string>();
                    arrayComentariosJogador.forEach(async (elementIdComment: any) => {
                        if (element.listaComentarios.includes(elementIdComment)) {
                            element.listaComentarios.forEach(element2 => {
                                if (element2 != elementIdComment) {
                                    aux.push(element2);
                                }
                            });
                        }
                        this.postRepo.atualizaComentarios(element.id, aux);
                    });
                });

                return Result.ok((await this.postRepo.getPosts()).getValue());
            }
        } catch (e) {
            throw e;
        }
    }

    public async delete(id: string) {
        try {
            const post = (await this.postRepo.delete(id)).getValue();
            return Result.ok(post);
        } catch (e) {
            throw e;
        }
    }
}