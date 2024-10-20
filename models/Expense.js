const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        splitAmount: { type: Number }
    }],
    splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
