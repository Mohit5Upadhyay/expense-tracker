
const User = require("../models/user.model");
const Income = require("../models/income.model");
const xlsx = require("xlsx");


// controller for income implementation

//add income
exports.addIncome = async (req, res) => {
    const  userId = req.user.id;

    // console.log(userId , "userId from income controller");

    try {
        const {icon , source , amount , date} = req.body;

        // validation for input
        if(!source || !amount || !date) {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }

        // accessing data
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date : new Date(date)
        })

        // console.log("new Date(date)" , new Date(date));
        
        // saving data to db
        await newIncome.save()
        res.status(201).json({
            message: "Income added successfully",
            newIncome
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    // console.log(userId , "userId from income controller");

    try {
        const income = await Income.find({userId}).sort({date: -1});
        res.status(200).json({
            message: "All income fetched successfully",
            income
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }

}

exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;
    // console.log(userId , "userId from delete income controller");
    

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Income deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
        
    }
}


exports.downloadIncomeExcel = async (req, res) => {

    const userId = req.user.id;

    try {
        const income = await Income.find({userId}).sort({date: -1});
        if(income.length ===0){
            return res.status(404).json({
                message: "No income found"
            })
        }


        // prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: `₹ ${item.amount}`,
            Date: item.date.toLocaleDateString("en-In", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }),
        }))

        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(workbook,worksheet, "Income")

        xlsx.writeFile(workbook, 'income_details.xlsx')

        res.download('income_details.xlsx')

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
        
    }

}







