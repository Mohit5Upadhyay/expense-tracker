import React from 'react'

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader