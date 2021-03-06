import { Request, Response, NextFunction } from "express";

export default interface IPostController {
    atualizaComments(req: Request, res: Response, next: NextFunction);
    getPosts(req: Request, res: Response, next: NextFunction);
    createPost(req: Request, res: Response, next: NextFunction);
    updateLikePost(req: Request, res: Response, next: NextFunction);
    updateDislikePost(req: Request, res: Response, next: NextFunction);
    getPostsByEmail(req: Request, res: Response, next: NextFunction);
    delete(req: Request, res: Response, next: NextFunction);
}