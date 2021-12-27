
import mongoose from 'mongoose';
import { IComentarioPersistence } from "../../dataschema/IComentarioPersistence";

const ComentarioSchema = new mongoose.Schema(
    {
        domainId: { type:String, unique: true},
        autor: {type:String},
        texto: {type:String},
        likes: {type:[String]},
        dislikes: {type:[String]}
    },
    {
        timestamps:true
    }
);

export default mongoose.model<IComentarioPersistence & mongoose.Document>('Comentario',ComentarioSchema);