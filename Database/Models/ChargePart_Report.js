import sequelize from "../Connection/Connection.js";
import Sequelize from "sequelize";
import User from "./User.js";

const ChargePart_Report = sequelize.define(
  "ChargePart_Report",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    PKID: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    partName: {
      type: DataTypes.STRING(50),
      primaryKey: false,
      allowNull: false,
    },
    oldPartID: {
      type: DataTypes.STRING(50),
      primaryKey: false,
      allowNull: false,
    },
    newPartID: {
      type: DataTypes.STRING(50),
      primaryKey: false,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE(6),
      allowNull: false,
      timezone: false,
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE(6),
      allowNull: false,
      timezone: false,
      field: "updated_at",
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    timestamps: true,
  }
);

ChargePart_Report.belongsTo(User, { foreignKey: "userId", as: "users" });

ChargePart_Report.sync()
  .then(() => {
    console.log("ChargePart_Report model synchronized successfully");
  })
  .catch((err) => {
    console.error(
      "Failed to synchronize ChargePart_Report model: ",
      err.message
    );
  });

export default ChargePart_Report;
