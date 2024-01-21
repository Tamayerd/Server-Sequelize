import express from "express";
import controller from "../Controller/MaintenceTable.js";

const app = express();

//MaintenceTable

//GET request for Maintence Table all items.
app.get("/allMaintance", controller.list);

//POST request for new report.
app.post("/newMaintance", controller.createReport);




export default app;
