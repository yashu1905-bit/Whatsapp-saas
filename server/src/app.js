import express from "express";
const app = express();
import apiRouter from "../src/routes/index.js";
app.use(express.json());

// http://localhost:4001/api
app.use("/api", apiRouter);




export default app;
