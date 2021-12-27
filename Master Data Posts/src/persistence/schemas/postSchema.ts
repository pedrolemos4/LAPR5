import { IPostPersistence } from "../../dataschema/IPostPersistence";
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        description: { type: String },
        likes: { type: [String] },
        dislikes: { type: [String] },
        email: {type: String}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPostPersistence & mongoose.Document>('Post', PostSchema);