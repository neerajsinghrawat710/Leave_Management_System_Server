const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { mandatoryField } = require("../helper/common.helper");
const AdminModel = require("../model/admin.model");

const login = async (req, res) => {
    try {
        let validator = mandatoryField(req.body, ['email', 'password']);
        if (validator.length > 0) {
            return res.status(404).json({ status: 404, message: `${JSON.stringify(validator)} are mandatory field` })
        }

        let userObj = await AdminModel.findOne({ email: req.body.email })
            .lean()
            .exec()


        if (!userObj?.email) {
            return res.status(404).json({ status: 404, message: 'No User found with this email.' })
        }

        const passwordMatch = await bcrypt.compare(req.body.password, userObj.password);
        if (!passwordMatch) {
            return res.status(404).json({ status: 404, message: 'You have entered incorrect password.' })
        }

        let token = jwt.sign(
            { email: userObj?.email, password: userObj?.password },
            process.env.JWT_SECRET_KEY
        );

        return res.status(200).json({ status: 200, data: userObj, token: token, message: "You have logged-in successfully." })
    } catch (error) {
        return res.status(500).json({ status: 500, error: error, message: error?.message })
    }
}


// test controller--------->
const createAdmin = async (req, res) => {
    try {
        let validator = mandatoryField(req.body, ['email', 'password']);
        if (validator.length > 0) {
            return res.status(404).json({ status: 404, message: `${JSON.stringify(validator)} are mandatory field` })
        }
        const { email, password } = req.body

        const passwordHash = await bcrypt.hash(password, Number(process.env.SALT));

        const admin = new AdminModel({
            email,
            password: passwordHash
        })

        const newAdmin = await admin.save()

        return res.status(200).json({ status: 200, data: newAdmin, message: "Admin created successfully." })
    } catch (error) {
        return res.status(500).json({ status: 500, error: error, message: error?.message })
    }
}

module.exports = {
    login,
    createAdmin
}

