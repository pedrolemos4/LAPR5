import { IPostPersistence } from "../../dataschema/IPostSchema";
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        domainId:{ type:String, unique:true},
        description: {type:String,unique:true}
    },
    {
        timestamps:true
    }
);

export default mongoose.model<IPostPersistence & mongoose.Document>('Post',PostSchema);