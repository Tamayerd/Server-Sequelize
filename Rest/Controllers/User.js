import {
  generateToken,
  hashPassword,
  checkPassword,
  verifyToken,
} from "../../Authorization/Auth.js";
import User from "../../Database/Models/User.js";

export default class UserController {
  static async list(req, res) {
    try {
      const entity = await User.findAll({
        attributes: { exclude: ["list", "created_at", "password"] },
      });
      res.send(entity);
    } catch (error) {
      res.status(403).send(error.message);
      console.log(error.message);
    }
  }

  //Register
  static async register(req, res) {
    try {
      const { username, password } = req.body;

      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({
        username,
     
        password: hashedPassword,
      });

      res.status(201).send(newUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  //Login
  static async login(req, res) {
    try {
      const { username, password } = await req.body;

      if (!username || !password) {
        return res.status(400).send("Username or password is missing");
      }
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).send("User not found");
      }

      const token = await generateToken(user);
  
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      console.log(token)
      if (!token) {
        return res.status(401).send("Token is missing");
      }

      async function getPasswords() {
        try {
          const verified = await verifyToken(token);
          const data = await User.findAll(
            { where: { id: verified.id } },
            { dataValues: ["password"] }
          );

          const passwords = data.map((user) => user.dataValues.password);
          return passwords;
        } catch (error) {
          console.error("Error:", error);
          return [];
        }
      }
      const dbPasswordsPromise = await getPasswords();

      const isPasswordValid = await checkPassword(
        password,
        dbPasswordsPromise[0]
      );

      if (!isPasswordValid) {
        return res.status(401).send("Invalid password");
      }
      res.status(200).send(token);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
