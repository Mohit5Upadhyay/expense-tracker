import React from 'react'

function CustomLegend({payload}) {
  return (
    <div className='flex flex-wrap justify-center gap-2 mt- space-x-6'>
        {payload.map((entry,index) => (
            <div key={`legend-${index}`} className='flex items-center space-x-2'>
                <div 
                className='w-3 h-3 rounded-full' 
                style={{backgroundColor: entry.color}}>


                </div>
                <span className='text-sm font-semibold text-gray-700 ml-2 font-medium'>{entry.name}</span>
            </div>
        ))}
    </div>
  )
}

export default CustomLegend