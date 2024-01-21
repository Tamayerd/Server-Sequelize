import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  host: './db.sqlite'
});



sequelize.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
})
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });


export default sequelize;
