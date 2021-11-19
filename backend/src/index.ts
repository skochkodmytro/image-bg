import dotenv from 'dotenv';
import cluster from "cluster";
import { cpus } from 'os';

import config from "./config/config";

dotenv.config();

const totalCPUs = cpus().length;

import { runApp } from "./app";

if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < 2; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
} else {
    const options = process.env.NODE_ENV === 'production' ? config.production : config.development;
    runApp(options);
}
