import React from 'react'

function Modal({
    children,
    isOpen,
    onClose,
    title,
}) {

    if (!isOpen) return null


  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/50 bg-opacity-50'>
        <div className='relative w-full max-w-2xl max-h-full'>
            <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-700'>

                <div className='flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 md:p-5 border-gray-200'>
                    <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                        {title}
                    </h3>

                    <button
                        type='button'
                        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                        onClick={onClose}
                    >

                        <svg
                            aria-hidden='true'
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 6l12 12M4 18L16 6'
                            />
                        </svg>

                        // X
                    </button>
                </div>

                {/* modal body */}
                <div className='p-4 md:p-5 space-y-4'>
                    {children}
                </div>

            </div>
        </div>
    </div>
  )
}

export default Modal