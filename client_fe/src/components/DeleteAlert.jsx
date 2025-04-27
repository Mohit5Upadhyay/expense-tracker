import React from 'react'

function DeleteAlert({
    content,
    onDelete,
}) {
  return (
    <div>
        <p className='text-sm'>{content}</p>

        <div className="flex justify-end mt-4 gap-2">
            <button 
                type='button'
                className='text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800' 
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert