const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Expense = require('./models/expense');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const expenseRouter = require('./routes/expense');
const incomeRouter = require('./routes/expense');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use((req, res, next) => {
  res.locals.Expense = Expense;
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', expenseRouter);
app.use('/api', incomeRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.render('index.ejs', { expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
