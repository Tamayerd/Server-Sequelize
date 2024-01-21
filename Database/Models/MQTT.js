import sequelize from "../Connection/Connection.js";
import Sequelize from "sequelize";


const MQTT = sequelize.define(
  "MQTT",
  {
    mqttId: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
   
    topic: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
    data: {
        type: DataTypes.TEXT, 
        allowNull: true,
      },
    created_at: {
      type: DataTypes.DATE(6),
      allowNull: false,
      timezone: false,
      field: "created_at",
    },
   
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    timestamps: true,
  }
);






MQTT.sync()
  .then(() => {
    console.log("ChargePart_Report model synchronized successfully");
  })
  .catch((err) => {
    console.error(
      "Failed to synchronize ChargePart_Report model: ",
      err.message
    );
  });

export default MQTT;
