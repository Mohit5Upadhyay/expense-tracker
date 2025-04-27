import React from 'react'
import CARD_2 from '../../assets/images/image.png'
import { LuTrendingUpDown } from "react-icons/lu";

function AuthLayout({children}) {
  return (
    <div className='flex flex-col md:flex-row w-screen h-screen'>
        <div className='w-screen h-screen md:w-[60vw] md:px-12 px-5 pt-8 pb-12'>
            <h2 className='text-3xl font-semibold'>Expense Tracker..</h2>
            {children}
        </div>

        <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
            <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5'/>
            <div className='w-48 h-48 border-[20px] border-fuchsia-400 absolute top-[30%] -right-10'/>
            <div className='w-48 h-48 rounded-[40px] bg-violet-600 absolute -bottom-7 -left-5'/>


            <div className='grid grid-cols-2 gap-4 z-20'>
                <StatsInfoCard 
                    icon={<LuTrendingUpDown/>}
                    label="Track Your Income & Expense"
                    value="460,000"
                    color='bg-purple-600'
                />
            </div>

            <img src={CARD_2} alt="expense_income_chart_image" 
            className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg rounded-xl shadow-purple-600 border '/>

        </div>

    </div> 
  )
}

export default AuthLayout

const StatsInfoCard = ({icon, label, value, color}) =>{
    return(
        <div className='flexgap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-500 border border-gray-200/50 z-10'>
            <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl `}>
                {icon}
            </div>
            <div>
                <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
                <span className='text-[20px] '>₹ {value}</span>
            </div>
            
        </div>
    )
}      





