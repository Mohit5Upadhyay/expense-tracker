import React from 'react'

function CharAvatar({ fullName ,width , height , style }) {

  console.log("CharAvatar Props : ", fullName , typeof fullName, width , height , style);
  

  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} rounded-full bg-slate-800 flex items-center justify-center font-semibold text-white`}>

        {fullName?.charAt(0)?.toUpperCase().concat((fullName?.split(" ")[1]?.charAt(0)?.toUpperCase()))}
    </div>
  )
}

export default CharAvatar