import express from "express";
import cors from "cors";

import nftRouter from './Api/Routers/nftRouter'
import userRouter from './Api/Routers/userRouter'



const app = express();
app.use(express.json({limit:"100kb"}));
app.use(cors());
app.options("*",cors());

app.use('/api/v1/NFTs',nftRouter);
app.use('/api/v1/user', userRouter);

export default app;

