import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Reporting = db.define('reporting', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    namaPasien: DataTypes.STRING,
    hasildiagnosis: DataTypes.TEXT,
    linkpdf: DataTypes.STRING
}, {
    freezeTableName: true
});

export default Reporting;

(async () => {
    await db.sync();
})();