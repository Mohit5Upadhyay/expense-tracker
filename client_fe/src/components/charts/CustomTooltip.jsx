import React from 'react'

function CustomTooltip({active , payload}) {
  if(active && payload && payload.length) {
    return (
        <div className='bg-white border border-gray-300 rounded-lg p-2 shadow-md '>
            <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].name}</p>

            <p className='text-sm font-semibold text-gray-700'>Amount: <span className='text-sm font-medium text-gray-700'>₹ {payload[0].value}</span></p>
        </div>
    )
  }

  return null;
}

export default CustomTooltip