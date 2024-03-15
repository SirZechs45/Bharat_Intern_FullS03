const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  balance: { type: Number, default: 0 },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;

