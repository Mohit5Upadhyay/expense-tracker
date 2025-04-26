

const express = require('express');

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require('../controllers/incomeController')

const { protect } = require('../middlewares/authMiddlewares')

const router = express.Router()

router.post('/add', protect, addIncome)
router.get('/get', protect, getAllIncome)
router.delete('/delete/:id', protect, deleteIncome)
router.get('/download-excel', protect, downloadIncomeExcel)


module.exports = router
