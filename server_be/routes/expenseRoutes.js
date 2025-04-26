
const express = require('express');

const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require('../controllers/expenseController')

const { protect } = require('../middlewares/authMiddlewares')

const router = express.Router()

router.post('/add', protect, addExpense)
router.get('/get', protect, getAllExpense)
router.delete('/delete/:id', protect, deleteExpense)
router.get('/download-excel', protect, downloadExpenseExcel)


module.exports = router
