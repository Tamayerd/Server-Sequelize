import express from "express";
import controller from "../Controller/User.js";
import jwt from "jsonwebtoken";
import { generateToken, refreshToken } from "../../Authorization/Auth.js";

const saltRounds = 10;
const JWT_SECRET = "Server";

const app = express();

//GET request for all users.
app.get("/", controller.list);

// POST request for creating user.
app.post("/create", controller.register);

// let refreshTokens = []
// app.post("/referesh", (req, res) => {

//     const refreshToken = req.headers.authorization.split(" ")[1]

//     if(!refreshToken) return res.status(401).json("Kimlik doğrulanamadı!");
//     if(!refreshTokens.includes(refreshToken)){
//         return res.status(403).json("Refresh token geçerli değil!")
//     }
//     jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
//         err && console.log(err);
//         refreshTokens = refreshToken.filter((token)=> token !== refreshToken);
//         const newAccessToken = generateToken(user)
//         const newRefreshToken = refreshToken(user)

//         refreshTokens.push(newRefreshToken)

//         res.status(200).json({
//             token: newAccessToken,
//             refreshToken: newRefreshToken
//         })
//     })
// })

export default app;
