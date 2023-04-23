const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, default: '', },
    user_name: { type: String, default: '', },
    email: { type: String, default: '', },
    department: { type: String, enum: ['it', 'hr', 'admin'] },
    sick_leave_available: { type: Number, default: 2, },
    casual_leave_available: { type: Number, default: 2, },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)

module.exports = mongoose.model('employee', employeeSchema);

