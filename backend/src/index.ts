import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';

import router from "./router";

import { handleError } from "./middlewares/handleError";

dotenv.config();

// const DB_USER_INFO = process.env.NODE_ENV === 'production' ? `${options.DB_USER}:${options.DB_PASSWORD}@` : '';
//
// mongoose.connect(`mongodb://${DB_USER_INFO}${options.DB_HOST}:${options.DB_PORT}/${options.DB_NAME}`)
//     .then(() => {
//         console.log('Connected to MongoDB')
//     })
//     .catch(e => {
//         console.log(e);
//     });

const app = express();
const port = 8080;

app.use(cors({
    origin: "http://imagebg-static.s3-website.us-east-2.amazonaws.com/"
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public/'));

app.use(router);
app.use(handleError)

app.listen( port, () => {
    console.log( `Server run on ${port}` );
});
