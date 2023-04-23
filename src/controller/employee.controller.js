const { mandatoryField } = require("../helper/common.helper");
const EmployeeModel = require("../model/employee.model"); ({

})

const createEmployee = async (req, res) => {
    try {
        let validator = mandatoryField(req.body, ['name', 'user_name', 'email', 'department']);
        if (validator.length > 0) {
            return res.status(404).json({ message: `${JSON.stringify(validator)} are mandatory field` })
        }

        const { name, user_name, email, department } = req.body

        const exitEmail = await EmployeeModel.findOne({ email })
        if (exitEmail?.email) {
            return res.status(403).json({ status: 403, message: 'Employee already exist with given email!' })
        }

        const exitUserName = await EmployeeModel.findOne({ user_name })
        if (exitUserName?.user_name) {
            return res.status(403).json({ status: 403, message: 'Employee already exist with given user name!' })
        }

        const employee = new EmployeeModel({
            name,
            user_name,
            email,
            department
        })


        const newEmployee = await employee.save()

        return res.status(200).json({ status: 200, data: newEmployee, message: "New employee created successfully." })
    } catch (error) {
        return res.status(500).json({ status: 500, error: error, message: error?.message })
    }
}

const getEmployee = async (req, res) => {
    try {

        const employee = await EmployeeModel.find()
            .lean()
            .exec()

        return res.status(200).json({ status: 200, data: employee, message: "Employee's details got successfully." })
    } catch (error) {
        return res.status(500).json({ status: 500, error: error, message: error?.message })
    }
}


const getSingleEmployee = async (req, res) => {
    try {

        const { empId } = req.params

        const employee = await EmployeeModel.findById(empId)
            .lean()
            .exec()

        return res.status(200).json({ status: 200, data: employee, message: "Employee details got successfully." })
    } catch (error) {
        return res.status(500).json({ status: 500, error: error, message: error?.message })
    }
}

module.exports = {
    createEmployee,
    getEmployee,
    getSingleEmployee
}




