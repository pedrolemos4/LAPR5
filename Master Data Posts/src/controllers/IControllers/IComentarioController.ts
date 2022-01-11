import { Request, Response, NextFunction } from "express";

export default interface IComentarioController {
    getComentarios(req: Request, res: Response, next: NextFunction);
    getComentarioById(req: Request, res: Response, next: NextFunction);
    createComentario(req: Request, res: Response, next: NextFunction);
    getComentarioByAutor(req: Request, res: Response, next: NextFunction);
}