import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../cards/TransactionInfoCard'

function RecentTransactions({
    transactions,
    onSeeMore
}) {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>

            <h5 className='text-lg'>Recent Transactions-</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' /> 
            </button>
        </div>
        

        {/* transaction cards */}
        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((item) => (
                //return the card
                <TransactionInfoCard
                    key={item._id}
                    title={item.type == 'expense' ? item.category : item.source}
                    amount={item.amount}
                    date={moment(item.date).format("DD MMM YYYY")}
                    type={item.type}
                    icon={item.icon}
                    hideDeleteBtn
                />
            ))}
        </div>

    </div>
  )
}

export default RecentTransactions