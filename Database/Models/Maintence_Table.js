import sequelize from "../Connection/Connection.js";
import Sequelize from "sequelize";
import User from "./User.js";
const Maintance_Table = sequelize.define(
  "MaintanceTable",
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
    NamePart:{
      type:DataTypes.STRING(50),
      primaryKey: false,
      allowNull: false,
    },
    partID: {
      type: DataTypes.STRING(50),
      primaryKey: false,
      allowNull: true,
    },
    newPartID: {
      type: DataTypes.STRING(50),
      primaryKey: false,
      allowNull: true,
    },
    IsPartChanged: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    IsItPeriodic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    period:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue: null 
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

Maintance_Table.belongsTo(User, { foreignKey: "userId", as: "users" });

Maintance_Table.sync()
  .then(() => {
    console.log("MaintanceTable model synchronized successfully");
  })
  .catch((err) => {
    console.error("Failed to synchronize MaintanceTable model: ", err.message);
  });

export default Maintance_Table;
