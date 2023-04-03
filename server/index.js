
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);


const DB_USERNAME = process.env.DB_USERNAME || "js_mastery";
const DB_PASSWORD = process.env.DB_PASSWORD || "M6WfDnJEoj9HkV2d";
const DB_IP_ADDR = process.env.DB_IP_ADDR || "practice.jto9p.mongodb.net";
const DB_COLLECTION = process.env.DB_COLLECTION || "memories_app";

const CONNECTION_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_IP_ADDR}/${DB_COLLECTION}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

console.log(CONNECTION_URL);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);