import React from 'react'
import CustomPieChart from '../charts/CustomPieChart'

const COLORS = ["#875cf5" , "#FA2C37" ,"#FF6900"]

function FinanceOverview({
    totalIncome,
    totalExpense,
    totalBalance
}) {

    const balanceData = [
        {
            name: "Total Balance",
            amount: totalBalance,
        },
        {
            name: "Total Income",
            amount: totalIncome,
        },
        {
            name: "Total Expense",
            amount: totalExpense,
        },
    ]

  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg font-semibold">
                Financial Overview.
            </h5>
        </div>

        {/* PIE CHART */}
        <CustomPieChart
            data={balanceData}
            colors={COLORS}
            label="Total Balance"
            totalAmount={`₹ ${totalBalance}`}
            showTextAnchor
        />

    </div>
  )
}

export default FinanceOverview