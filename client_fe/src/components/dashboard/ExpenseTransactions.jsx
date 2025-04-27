import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import moment from 'moment'

function ExpenseTransactions({
    transactions,
    onSeeMore,
}) {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg font-semibold'>Expense</h5>

            <button className='card-btn' 
            onClick={onSeeMore}
            >
                See ALL <LuArrowRight className='text-base' /> 
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((expense) => (
                <TransactionInfoCard 
                    key={expense._id}
                    title={expense.category}
                    amount={expense.amount}
                    date={moment(expense.date).format("DD MMM YYYY")}
                    type="expense"
                    icon={expense.icon}
                    hideDeleteBtn
                />
            ))}

        </div>


    </div>
  )
}

export default ExpenseTransactions