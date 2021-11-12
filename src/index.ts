import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import cluster from "cluster";
import { cpus } from 'os';

const totalCPUs = cpus().length;

import router from "./router";
import { handleError } from "./middlewares/handleError";
import { runApp } from "./app";

// mongoose.connect('mongodb://localhost:27017/image-bg').then((res) => {
//     console.log('Connected to MongoDB');
// });

if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
} else {
    runApp();
}
