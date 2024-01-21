import sequelize from "../Connection/Connection.js";
import Sequelize from "sequelize";



const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "tamay",
      unique: true,
    },

    password: {
      type: DataTypes.STRING(255),
      defaultValue: "tamay",
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

User.sync()
  .then(() => {
    console.log("User model synchronized successfully");
  })
  .catch((err) => {
    console.error("Failed to synchronize Admins model: ", err.message);
  });

export default User;
