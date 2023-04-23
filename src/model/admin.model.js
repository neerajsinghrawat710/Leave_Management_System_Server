const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    role: { type: String, enum: ['admin', 'super_admin'], default: 'super_admin' },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

module.exports = mongoose.model('admin', adminSchema);
