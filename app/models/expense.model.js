const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    name: String,
    amount: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);