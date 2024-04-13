const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    email: String,
    password: String
    // confirmPassword: String
})

const EmployeeModel = mongoose.model("employees", employeeSchema);
module.exports = EmployeeModel