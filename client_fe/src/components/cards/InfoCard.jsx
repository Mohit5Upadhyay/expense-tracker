import React from 'react'

function InfoCard( {
    icon, 
    label,
    value,
    color
}) {
  return (
    <div className='flex gap-6 bg-white rounded-2xl shadow-md shadow-gray-50 border mb-3 border-gray-200/5 p-5 items-center justify-between'>
        <div className={`w-14 h-14 flex items-center justify-center rounded ${color} text-white text-[26px] drop-shadow-xl`}>
           {icon}
        </div>

        <div>
            <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
            <span className='text-[22px] '>₹{ " " + value}</span>
        </div>

    </div>
  )
}

export default InfoCard