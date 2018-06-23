const Expense = require('../models/expense.model.js');

// create and save a new expense
exports.create = (req, res) => {
    console.log(req.body.content);
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Expense content can not be empty'
        });
    }
    const expense = new Expense({
        name: req.body.name,
        amount: req.body.amount
    });
    expense.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while creating expense'
        });
    });
};

// retrieve and return all expenses from database
exports.findAll = (req, res) => {
    Expense.find().then(expenses => {
        res.send(expenses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'some error occurred while retrieving expenses'
        });
    });
};

// find a single expense with expenseId
exports.findOne = (req, res) => {
    Expense.findById(req.params.expenseId).then(expense => {
        if(!expense){
            return res.status(404).send({
                message: `Expense not found with id ${req.params.expenseId}`
            });
        }
        res.send(expense);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: `Expense not found with id ${req.params.expenseId}`
            });
        }
        return res.status(500).send({
            message: `Error retrieving Expense with id ${req.params.expenseId}`
        });
    });
};

// update an expense identified by an expenseId in the request
exports.update = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: `Expense content can not be empty`
        });
    }
    Expense.findByIdAndUpdate(req.params.expenseId, {
        name: req.body.name,
        amount: req.body.amount
    }, {new: true}).then(expense => {
        if (!expense) {
            return res.status(404).send({
                message: `Expense not found with id ${req.params.expenseId}`
            });
        }
        res.send(expense);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Expense not found with id ${req.params.expenseId}`
            });
        }
        return res.status(500).send({
            message: `Error updating expense with is ${req.params.expenseId}`
        });
    });
};

// delete an expense with a specified noteId in the request
exports.delete = (req, res) => {
    Expense.findByIdAndRemove(req.params.expenseId).then(expense => {
        if (!expense) {
            return expense.status(404).send({
                message: `Expense not found with id ${req.params.expenseId}`
            });
        }
        res.send({message: 'Expense deleted successfully'});
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: `Expense not found with id ${req.params.expenseId}`
                });
            }
            return res.status(500).send({
                message: `Could not delete expense with id ${req.params.noteId}`
        });
    })
};