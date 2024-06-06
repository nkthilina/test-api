const EmployeeModel = require("../models/Employee");

exports.getAllEmployees = async (req, res) => {
    const employees = await EmployeeModel.find();
    res.json(employees);
};