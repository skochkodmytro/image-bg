import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import cluster from "cluster";
import { cpus } from 'os';

const totalCPUs = cpus().length;

import router from "./router";
import { handleError } from "./middlewares/handleError";

mongoose.connect('mongodb://localhost:27017/image-bg').then((res) => {
    // console.log(res.models);
});

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
    const app = express();
    const port = 8080;

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use((req, res, next) => {
        if (cluster.isWorker && cluster.worker)
            console.log(
                `Worker ${cluster?.worker.id} handle request`
            );

        next();
    });

    app.use(router);
    app.use(handleError)

    app.listen( port, () => {
        console.log( `Worker id: ${cluster.worker ? cluster.worker.id : ''}` );
    });
}
