import { Request, Response, NextFunction } from "express";

export default interface IComentarioController {
    updateLikes(req: Request, res: Response, next: NextFunction);
    updateDislikes(req: Request, res: Response, next: NextFunction);
    getComentarios(req: Request, res: Response, next: NextFunction);
    getComentarioById(req: Request, res: Response, next: NextFunction);
    createComentario(req: Request, res: Response, next: NextFunction);
    getComentarioByAutor(req: Request, res: Response, next: NextFunction);
    delete(req: Request, res: Response, next: NextFunction);
}