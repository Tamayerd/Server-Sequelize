import express from "express";
import controller from "../Controller/FaultCodeReport.js";

const app = express();

//GET request for Fault Controller all items.
app.get("/getFault", controller.list);

////POST request for new fault.
app.post("/createFault", controller.createReport);

export default app;
