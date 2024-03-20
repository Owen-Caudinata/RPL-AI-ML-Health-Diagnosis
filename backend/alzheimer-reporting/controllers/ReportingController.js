import Reporting from "../models/ReportingModel.js";

export const getReportings = async (req, res) => {
    try {
        const response = await Reporting.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};