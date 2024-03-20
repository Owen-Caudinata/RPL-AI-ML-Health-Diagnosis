import { Sequelize } from "sequelize";

//membuat konfigurasi database
const db = new Sequelize('reporting_alzheimer', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;