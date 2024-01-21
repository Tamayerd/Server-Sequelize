import sequelize from "../Connection/Connection.js";
import Sequelize from "sequelize";
import User from "./User.js";

const FaultCodeReport = sequelize.define(
  "FaultCodeReport",
  {
    userId: {
      type: DataTypes.UUID,
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
    FaultCode: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    faultDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      timezone: false,
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE,
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

FaultCodeReport.belongsTo(User, { foreignKey: "userId", as: "users" });

FaultCodeReport.sync()
  .then(() => {
    console.log("FaultCodeReport model synchronized successfully");
  })
  .catch((err) => {
    console.error("Failed to synchronize FaultCodeReport model: ", err.message);
  });

export default FaultCodeReport;
