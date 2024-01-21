import express from "express";
import { processData, getData } from "../Controller/DowloadFile.js";

const app = express();
app.use(express.json());

//Node.js datayı JSON olarak alır 
app.post("/file", processData);

//JSON datasını Front a gönder
app.get("/getFile", getData)

export default app;
