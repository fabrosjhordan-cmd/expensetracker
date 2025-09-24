import { AlertCircle, Check, X } from 'lucide-react'
import React from 'react'

function Toast({Toast, removeToast}) {
  return (
    <div className='fixed top-4 right-4 z-50 space-y-2'>
      {Toast.map((t)=>{
        return(
          <div key={t.id} className={`flex items-center p-4 rounded-lg shadow-lg backdrop-blur-sm border transform transition-all duration-300 easy-in-out ${
          t.type === "success" ? 'bg-green-900/80 border-green-700 text-green-100' : 
          t.type === "error" ? 'bg-red-900/80 border-red-700 text-red-100' : 
          'bg-yellow-900/80 border-yellow-700 text-yellow-100'
        }`}>
            {t.type === "success" &&(<Check className='w-5 h-5 mr-2 flex-shrink-0' />)}

            {t.type === "error" &&(<AlertCircle className='w-5 h-5 mr-2 flex-shrink-0' />)}

            {t.type === "info" &&(<AlertCircle className='w-5 h-5 mr-2 flex-shrink-0' />)}

            <span className='mr-2'>{t.message}</span>
            <button className='ml-auto text-gray-300 hover:text-white transition-colors'
                    onClick={()=>removeToast(t.id)}
            >
                <X className='w-4 h-4'/>
            </button>
        </div>
        )
      })}
        
    </div>
  )
}

export default Toast
