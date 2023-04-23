const jwt = require('jsonwebtoken');
const AuthModel = require('../model/ss_auth.model');

module.exports = class SS_Auth {

    async authMiddleware(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token || token == undefined) {
                return res.status(401).json({ status: 401, error: 'error', message: "user is not authrized." })
            }
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const email = decodedToken.email;
            const password = decodedToken.password;

            let userExits = await AuthModel.findOne({ email: email, password: password }).lean().exec()

            if (!userExits || userExits == null) {
                return res.status(401).json({ status: 401, message: "You are not authriszed user." })
            }
            if (userExits.is_block != undefined && userExits.is_block == true) {
                return res.status(401).json({ status: 401, message: 'You are blocked by Super Admin, Please contact with  Super Amdin for more details.' })
            }

            next();
        } catch (error) {
            console.log("SS_Auth ---> authMiddleware() ----> error---->", error.message);
            return res.status(500).json({ status: 500, message: "some technical issue" });
        }
    }
}