const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    leave_applied_days: { type: Number, default: 0 },
    leave_type: { type: String, enum: ['sick_leave', 'casual_leave'] },
    emp_id: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },
    leave_start_date: { type: Date },
    leave_end_date: { type: Date },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }

    }
)


module.exports = mongoose.model('leave', leaveSchema);

