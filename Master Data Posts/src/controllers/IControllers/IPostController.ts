import { Request,Response, NextFunction } from "express";

export default interface IPostController {
    getPosts(req:Request,res:Response,next:NextFunction);
    createPost(req:Request,res:Response,next:NextFunction);
    updatePost(req:Request,res:Response,next:NextFunction);
    getPostsByEmail(req:Request,res:Response,next:NextFunction);
    delete(req:Request,res:Response,next:NextFunction);
}