const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
})

const EmployeeModel = mongoose.model("employees", employeeSchema);
module.exports = EmployeeModel