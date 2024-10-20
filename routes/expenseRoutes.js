const express = require('express');
const { addExpense, getUserExpenses, getAllExpenses } = require('../controllers/expenseController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/add', auth, addExpense);
router.get('/user', auth, getUserExpenses);
router.get('/all', auth, getAllExpenses);

module.exports = router;
