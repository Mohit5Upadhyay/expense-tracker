import React from 'react'

function CharAvatar({ fullName ,width , height , style }) {
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} rounded-full bg-slate-400 flex items-center justify-center font-medium text-gray-900`}>

        {fullName?.charAt(0)?.toUpperCase().concat((fullName?.split(" ")[1]?.charAt(0)?.toUpperCase())) || "~"}
    </div>
  )
}

export default CharAvatar