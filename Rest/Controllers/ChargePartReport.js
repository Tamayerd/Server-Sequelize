import ChargePart_Report from "../../Database/Models/ChargePart_Report.js";
import User from "../../Database/Models/User.js";
import { verifyToken } from "../../Authorization/Auth.js";

export default class ChargePartReport {
  //Tüm raporları getirme.
  static async list(req, res) {
    try {
      const reports = await ChargePart_Report.findAll({
        include: [
          {
            model: User,
            as: "users",
          },
        ],
      });

      res.send(reports);
    } catch (error) {
      res.status(403).send(error.message);
      console.log(error.message);
    }
  }

  //Yeni rapor ekleme.
  static async createReport(req, res) {
    try {
      const createdReports = [];

      for (let i = 0; i < req.body.length; i++) {
        const { partName, oldPartID, newPartID, description } = req.body[i];
        if (!description) {
          console.log("userId");
          return res
            .status(400)
            .send({ message: "Açıklama alanı boş bırakılamaz." });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = verifyToken(token);
        const userId = decoded.id;

        const newReport = await ChargePart_Report.create({
          userId,
          partName,
          oldPartID,
          newPartID,
          description,
        });
        console.log(newReport);
        createdReports.push(newReport);
      }
      res.status(200).send("OK");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
