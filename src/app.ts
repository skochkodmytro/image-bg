import express from "express";
import bodyParser from "body-parser";
import router from "./router";
import { handleError } from "./middlewares/handleError";
import mongoose from "mongoose";

export const runApp = () => {
    mongoose.connect('mongodb://localhost:27017/image-bg').then((res) => {
        console.log('Connected to MongoDB');
    });

    const app = express();
    const port = 8080;

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use(router);
    app.use(handleError)

    app.listen( port, () => {
        console.log( `Server run on ${port}` );
    });
}