import { Request,Response, NextFunction } from "express";

export default interface IComentarioController {
    getComentarios(req:Request,res:Response,next:NextFunction);
    createComentario(req:Request,res:Response,next:NextFunction);
}