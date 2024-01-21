import express from "express";
import controller from "../Controller/ChargePartReport.js";

const app = express();

//ChargePartReports

//GET request for Charge Controller all items.
app.get("/allReports", controller.list);

//POST request for new report.
app.post("/newReport", controller.createReport);



export default app;
