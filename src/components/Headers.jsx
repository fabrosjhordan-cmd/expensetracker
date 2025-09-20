import { Wallet } from 'lucide-react'
import React from 'react'

function Headers() {
  return (
    <div className='text-center mb-12'>
        <div className='flex items-center justify-center mb-6'>
            <div className='p-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl shadow-lg'>
            <Wallet />
            </div>
        </div>
        <h1 className='text-5xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4'>
        Money Flow
        </h1>
        <p className='text-xl text-gray-300'>Master your finance with style</p>
    </div>
  )
}

export default Headers
