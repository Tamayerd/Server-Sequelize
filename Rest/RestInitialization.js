import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserMiddleware from "./Middlewares/Middleware.js";

const PORT = 5000;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json({ limit: "25mb" }));
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(cookieParser());

app.use("/user", UserMiddleware);

let RestInitialization = app.listen(PORT, function () {
  console.log("Https Server listening at http://localhost:%s", PORT);
});

export default RestInitialization;
