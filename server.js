import mongoose from 'mongoose';
import next from 'next';
import dotenv from 'dotenv';


const dev = process.env.NODE_ENV !== 'production';
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

dotenv.config({ path: './config.env' });

import app from './app';

const DB = process.env.DATABASE.replace(
    "PASSWORD",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
    .then(() => console.log("DB connect successful"));

const port = 3000;

let server;
nextServer.prepare().then(() => {
    app.get('/', (req, res) => {
        return handle(req, res)
    }
    )
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})})