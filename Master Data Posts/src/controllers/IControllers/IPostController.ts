import { Request, Response, NextFunction } from "express";
import { ParsedQs } from "qs";

export default interface IPostController {
    atualizaComments(req: Request, res: Response, next: NextFunction);
    getPosts(req: Request, res: Response, next: NextFunction);
    createPost(req: Request, res: Response, next: NextFunction);
    updatePost(req: Request, res: Response, next: NextFunction);
    getPostsByEmail(req: Request, res: Response, next: NextFunction);
    delete(req: Request, res: Response, next: NextFunction);
}