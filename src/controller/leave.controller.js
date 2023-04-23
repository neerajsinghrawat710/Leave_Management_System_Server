const { mandatoryField } = require("../helper/common.helper");
const LeaveModel = require("../model/leave.model");
const moment = require('moment');
const EmployeeModel = require("../model/employee.model");
const { default: mongoose } = require("mongoose");

const applyLeave = async (req, res) => {
    try {
        let validator = mandatoryField(req.body, ['emp_id', 'leave_type', 'leave_start_date', 'leave_end_date']);
        if (validator.length > 0) {
            return res.status(404).json({ status: 404, message: `${JSON.stringify(validator)} are mandatory field` })
        }

        const { emp_id, leave_type, leave_start_date, leave_end_date } = req.body

        const start_date = moment(leave_start_date);
        const end_date = moment(leave_end_date);


        const leave_applied_days = end_date.diff(start_date, 'days')

        const aviableSickLeaves = await EmployeeModel.findById(mongoose.Types.ObjectId(emp_id))
            .select('sick_leave_available')
            .lean()
            .exec()

        if (leave_type == 'sick_leave') {
            if (leave_applied_days > aviableSickLeaves?.sick_leave_available) {
                return res.status(404).json({ status: 404, message: `You don't have given leave available, you requested for. you have only ${aviableSickLeaves?.sick_leave_available} leave available. ` })
            }
        }

        const aviableCasualLeaves = await EmployeeModel.findById(mongoose.Types.ObjectId(emp_id))
            .select('casual_leave_available')
            .lean()
            .exec()

        if (leave_type == 'casual_leave') {
            if (leave_applied_days > aviableCasualLeaves?.casual_leave_available) {
                return res.status(404).json({ status: 404, message: `You don't have given leave available, you requested for. you have only ${aviableSickLeaves?.sick_leave_available} leave available. ` })
            }
        }

        const leaveData = new LeaveModel({
            emp_id: emp_id,
            leave_applied_days: leave_applied_days,
            leave_start_date: leave_start_date,
            leave_end_date: leave_end_date,
            leave_type: leave_type,

        })

        const leaveApplied = leaveData.save()

        if (leaveApplied) {

            if (leave_type == 'sick_leave') {
                await EmployeeModel.findOneAndUpdate(mongoose.Types.ObjectId(emp_id),
                    { $inc: { sick_leave_available: -leave_applied_days } })
                    .lean()
                    .exec()
            }
            else if (leave_type == 'casual_leave') {
                await EmployeeModel.findOneAndUpdate(mongoose.Types.ObjectId(emp_id),
                    { $inc: { casual_leave_available: -leave_applied_days } })
                    .lean()
                    .exec()
            }
        }

        return res.status(200).json({ status: 200, data: leaveApplied, message: "You have Appied successfully." })
    } catch (error) {
        return res.status(500).json({ status: 500, error: error, message: error?.message })
    }
}

const getLeave = async (req, res) => {
    try {
        const leaveApplied = await LeaveModel.find()
            .populate({
                path: 'emp_id',
                select: 'name email user_name'
            })
            .lean()
            .exec()

        return res.status(200).json({ status: 200, data: leaveApplied, message: "Leave's data got successfully." })
    } catch (error) {
        return res.status(500).json({ status: 500, error: error, message: error?.message })
    }
}

module.exports = {
    applyLeave,
    getLeave
}




