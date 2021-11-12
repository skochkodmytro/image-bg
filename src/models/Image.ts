import { Schema, model, Document } from "mongoose";

export interface IImage extends Document {
    name: string,
    url: string
}

const Image = new Schema<IImage>({
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

export default model<IImage>('Image', Image);
