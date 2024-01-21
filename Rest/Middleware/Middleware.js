import express from "express";
const app = express();

import UserRouter from "../Routes/User.js";
import LoginRoute from "../Routes/Login.js";
import Charge from "../Routes/ChargeReports.js";
import Maintance from "../Routes/MaintanceReports.js";
import Fault from "../Routes/FaultCode.js";
import Dowload from "../Routes/DowloadFile.js"

app.use((req, res, next) => {
console.log(req.headers)
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

Routes

app.use("/history")
app.use("/user", UserRouter);
app.use("/login", LoginRoute);
app.use("/charge", Charge);
app.use("/maintance", Maintance);
app.use("/fault", Fault);
app.use("/dowload", Dowload)


export default app;
