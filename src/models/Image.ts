import { Schema, model, Document } from "mongoose";

export interface IImage extends Document {
    name: string,
}

const Image = new Schema<IImage>({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

export default model<IImage>('Image', Image);
