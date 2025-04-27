import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

function AddIncomeForm({
    onAddIncome,
}) {

    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    })

    const handleChange = (key , value) => setIncome({...income , [key]: value})


  return (
    <div>

        <EmojiPickerPopup 
            icon={income.icon}
            onSelect={(selectedIcon) => handleChange("icon" , selectedIcon)}
        />

        <Input 
            value={income.source}
            onChange={(e) => handleChange("source" , e.target.value)}
            label="Income Source"
            placeholder="Freelance , Salary , etc"
            type="text"
        />

        <Input 
            value={income.income}
            onChange={(e) => handleChange("amount" , e.target.value)}
            label="Amount"
            placeholder="Enter amount in  ₹"
            type="number"
        />

        <Input 
            value={income.date}
            onChange={(e) => handleChange("date" , e.target.value)}
            label="Date"
            placeholder="Freelance , Salary , etc"
            type="date"
        />


        <div className='flex justify-end mt-4'>
            <button
                type='button'
                className='text-white bg-green-600 border px-3 py-2 hover:bg-transparent hover:border-green-600 hover:text-green-600 transition duration-300 ease-in-out rounded-lg cursor-pointer'
                onClick={() => onAddIncome(income)}    
            >
                Add Income
            </button>
        </div>


    </div>
  )
}

export default AddIncomeForm