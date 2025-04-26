import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomeBarChart from '../charts/CustomeBarChart'

function Last30DaysExpenses({
    data
}) {

    const [chartData, setChartData] = useState([])

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data)
        setChartData(result)
    },[data])


  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className="text-lg font-semibold mb-2">Last 30 Days Expenses</h5>
        </div>

        <CustomeBarChart data={chartData} />

    </div>
  )
}

export default Last30DaysExpenses