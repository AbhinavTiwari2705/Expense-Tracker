const Expense = require('../models/Expense');
const Joi = require('joi');

// Add an expense
exports.addExpense = async (req, res) => {
    try {
        const { description, amount, splitMethod, participants } = req.body;

        // Validate input
        const schema = Joi.object({
            description: Joi.string().required(),
            amount: Joi.number().required(),
            splitMethod: Joi.string().valid('equal', 'exact', 'percentage').required(),
            participants: Joi.array().items(Joi.object({
                user: Joi.string().required(),
                splitAmount: Joi.number().required(),
            })).required()
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const expense = new Expense({ description, amount, splitMethod, participants, createdBy: req.user.id });
        await expense.save();

        res.status(201).json({ message: "Expense added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Retrieve user's individual expenses
exports.getUserExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ 'participants.user': req.user.id });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Retrieve all expenses
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
