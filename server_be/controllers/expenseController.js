
const User = require("../models/user.model");
const Expense = require("../models/expense.model");
const xlsx = require("xlsx");


// controller for expense implementation

//add expense
exports.addExpense = async (req, res) => {
    const  userId = req.user.id;

    // console.log(userId , "userId from expense controller");

    try {
        const {icon , category , amount , date} = req.body;

        // validation for input
        if(!category || !amount || !date) {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }

        // accessing data
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date : new Date(date)
        })

        // console.log("new Date(date)" , new Date(date));
        
        // saving data to db
        await newExpense.save()
        res.status(201).json({
            message: "Expense added successfully",
            newExpense
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    // console.log(userId , "userId from all expenses controller");

    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        res.status(200).json({
            message: "All expense fetched successfully",
            expense
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }

}

exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;
    // console.log(userId , "userId from delete expense controller");
    

    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Expense deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
        
    }
}


exports.downloadExpenseExcel = async (req, res) => {

    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        if(expense.length ===0){
            return res.status(404).json({
                message: "No expense found"
            })
        }


        // prepare data for excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: `₹ ${item.amount}`,
            Date: item.date.toLocaleDateString("en-In", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }),
        }))

        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(workbook,worksheet, "Expense")

        xlsx.writeFile(workbook, 'expense_details.xlsx')

        res.download('expense_details.xlsx')

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
        
    }

}







