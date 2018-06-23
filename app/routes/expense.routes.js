module.exports = (app) => {
    const expenses = require('../controllers/expense.controller.js');

    // create a new expense
    app.post('/expenses', expenses.create);

    // retrieve all expenses
    app.get('/expenses', expenses.findAll);

    // retrieve a single expense
    app.get('/expenses/:expenseId', expenses.findOne);

    // update an expense with expenseId
    app.put('/expenses/:expenseId', expenses.update);

    // delete an expense with expenseId
    app.delete('/expenses:/expenseId', expenses.delete);
}