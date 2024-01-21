import Maintance_Table from "../../Database/Models/Maintence_Table.js";
import { verifyToken } from "../../Authorization/Auth.js";
import User from "../../Database/Models/User.js";

export default class MaintanceTable {
  //Tüm raporları getirme.
  static async list(req, res) {
    try {
      const reports = await Maintance_Table.findAll({
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
        const {
          NamePart,
          partID,
          newPartID,
          IsPartChanged,
          IsItPeriodic,
          description,
          period,
        } = req.body[i];
        //Açıklama boş bırakılamaz.
        if (!description && IsPartChanged === null) {
          return res
            .status(400)
            .send({ message: "Açıklama alanı boş bırakılamaz." });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = verifyToken(token);
        const userId = decoded.id;

        const newReport = await Maintance_Table.create({
          NamePart,
          userId,
          IsPartChanged,
          IsItPeriodic,
          partID,
          newPartID,
          description,
          period,
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
