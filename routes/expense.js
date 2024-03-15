const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

router.post('/expenses', async (req, res) => {
  try {
    const { description, amount } = req.body;
    
    const latestExpense = await Expense.findOne().sort({ date: -1 });
    let balance = 0;
    if (latestExpense) {
      balance = latestExpense.balance;
    }

    balance -= amount; 
    const expense = new Expense({ description, amount: Number(amount), balance });
    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/incomes', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const latestExpense = await Expense.findOne().sort({ date: -1 });
    let balance = 0;
    if (latestExpense) {
      balance = latestExpense.balance;
    }
    
    balance += Number(amount);
    const income = new Expense({ description: 'Income', amount: Number(amount), balance, date: new Date() });
    await income.save();
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Expense.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
