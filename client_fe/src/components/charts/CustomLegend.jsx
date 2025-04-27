import React from 'react'

function CustomLegend({payload}) {

  if (!payload || !payload.length === 0) return null
  console.log("Payload in CustomLegend : ", payload)
  

  return (
    <div className='flex flex-wrap justify-center border  gap-8 md:gap-20 mt-2'>
        {payload.map((entry,index) => (
            <div key={`legend-${index}`} className='flex items-center  space-x-3'>
                <div 
                className='w-4 h-4 rounded-full flex items-center justify-center gap-1 ' 
                style={{backgroundColor: entry.color}}>


                </div>
                <span className='text-sm   font-semibold text-gray-700 ml-2 '>{entry.value}</span>
            </div>
        ))}
    </div>
  )
}

export default CustomLegend