

const Income = require('../models/income.model');
const Expense = require('../models/expense.model');

const { isValidObject , Types } = require('mongoose');

// Dashboard Data
exports.getDashboardData = async (req , res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(userId);

        console.log("userId from dashboardContoller", userId);
        console.log("userObjectId from dashboardContoller", userObjectId);
        

        // fetching total income and expense from all documnets
        console.log(Income , "income model from dashboard controller");
        

        const totalIncome = await Income.aggregate([
            {$match: {
                userId: userObjectId
            }},
            {$group: {
                _id: null,
                totalIncome: {$sum: "$amount"}
            }},
        ])

        console.log("total income" , totalIncome);

        const totalExpense = await Expense.aggregate([
            {$match: {
                userId: userObjectId
            }},
            {$group: {
                _id: null,
                totalExpense: {$sum: "$amount"}
            }},
        ])

        console.log("total expense" , totalExpense);


        // getting income transaction in last 60 days
        const last60DaysIncomeTransaction = await Income.find({
            userId ,
            date: {
                $gte: new Date( Date.now() - 60 * 24 * 60 *60 * 1000)
            }
        }).sort({date: -1});


        console.log("last 60 days income transaction" , last60DaysIncomeTransaction);

        // get total income in last 60 days
        const incomeLast60Days = last60DaysIncomeTransaction.reduce((sum , transaction) => sum + transaction.amount , 0); // sum = 0 initially


        // getting expense transaction for last 30 days
        const last30DaysExpenseTransaction = await Expense.find({
            userId ,
            date: {
                $gte: new Date( Date.now() - 30 * 24 * 60 *60 * 1000)
            }
        }).sort({date: -1});
        log("last 30 days expense transaction" , last30DaysExpenseTransaction);

        // get total expense in last 30 days
        const expenseLast30Days = last30DaysExpenseTransaction.reduce((sum , transaction) => sum + transaction.amount , 0); // sum = 0 initially


        // fetching last 5 income transactions
        const lastTransaction = [ ...(await Income.find({userId}).sort({date: -1}).limit(5).map((txn) => ({
            ...txn.toObject(),
            type: "income",
        }))) , ...(await Expense.find({userId}).sort({date: -1}).limit(5).map((txn) => ({
            ...txn.toObject(),
            type: "expense",
        })))].sort((a , b) => b.date - a.date);



        console.log("last 5 transactions" , lastTransaction);


        res
            .status(200)
            .json({
                message: "Dashboard data fetched Successfully.",
                totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
                totalIncome: totalIncome[0]?.total || 0,
                totalExpense: totalExpense[0]?.total || 0,
                incomeLast60Days :{
                    total: incomeLast60Days,
                    transactions: last60DaysIncomeTransaction,
                },
                recentTransaction: lastTransaction ,
                last30DaysExpenses: {
                    total: expenseLast30Days,
                    transactions: last30DaysExpenseTransaction,
                }
            })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}





