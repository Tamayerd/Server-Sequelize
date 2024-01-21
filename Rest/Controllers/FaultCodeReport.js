import FaultCodeReport from "../../Database/Models/FaultCodeReport.js";
import { verifyToken } from "../../Authorization/Auth.js";
import User from "../../Database/Models/User.js";

export default class FaultCode {
  
  //Tüm raporları getirme.
  static async list(req, res) {
    try {
      const reports = await FaultCodeReport.findAll({
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

  //Rapor oluştur
  static async createReport(req, res) {
    try {
      const createdReports = [];

      for (let i = 0; i < req.body.length; i++) {
        const { FaultCode, faultDescription, description } = req.body[i];

        if (!description) {
          return res
            .status(400)
            .send({ message: "Açıklama alanı boş bırakılamaz." });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = verifyToken(token);
        const userId = decoded.id;

        const newReport = await FaultCodeReport.create({
          userId,
          FaultCode,
          description,
          faultDescription,
        });

        createdReports.push(newReport);
      }

      res.send(createdReports);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
