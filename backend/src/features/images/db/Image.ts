import { Schema, model, Document } from "mongoose";

export interface IImage {
    name: string,
    url: string
}

interface UserDocument extends IImage, Document {}

const ImageSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        unique: true,
        required: true,
    }
});

export default model<IImage>('Image', ImageSchema);
