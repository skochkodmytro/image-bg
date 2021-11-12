import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fileUpload from 'express-fileupload';

import router from "./router";
import { handleError } from "./middlewares/handleError";

export const runApp = () => {
    mongoose.connect('mongodb://localhost:27017/image-bg').then(() => {
        console.log('Connected to MongoDB');
    });

    const app = express();
    const port = 8080;

    app.use(fileUpload());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(express.static('public'));

    app.use(router);
    app.use(handleError)

    app.listen( port, () => {
        console.log( `Server run on ${port}` );
    });
}