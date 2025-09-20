import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'

function SummaryCard() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
        {/* trending up */}
    <div className='bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm rounded-3xl p-8 border border-emerald-500/20 shadow-xl'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <p className='text-emerald-300 text-sm font-medium uppercase tracking-wide '>Total Income</p>
                <p className='text-4xl font-bold text-emerald-400 mt-2'>₱12,345.67</p>
            </div>
            <div className='p-4 bg-emerald-500/20 rounded-2xl'>
                <TrendingUp className='w-8 h-8 text-emerald-400'/>
            </div>
        </div>
    </div>
    {/* trending down */}
    <div className='bg-gradient-to-r from-red-500/10 to-red-600/10 backdrop-blur-sm rounded-3xl p-8 border border-red-500/20 shadow-xl'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <p className='text-red-300 text-sm font-medium uppercase tracking-wide '>Total Expense</p>
                <p className='text-4xl font-bold text-red-400 mt-2'>₱10,345.67</p>
            </div>
            <div className='p-4 bg-red-500/20 rounded-2xl'>
                <TrendingDown className='w-8 h-8 text-red-400'/>
            </div>
        </div>
    </div>
    {/* Net Balance */}
    <div className={`bg-gradient-to-r from-red-500/10 to-red-600/10 backdrop-blur-sm rounded-3xl p-8 border border-red-500/20 shadow-xl`}>
        <div className='flex items-center justify-between'>
            <div className=''>
                <p className={`text-red-300 text-sm font-medium uppercase tracking-wide `}>Total Expense</p>
                <p className={`text-4xl font-bold text-red-400 mt-2`}>₱10,345.67</p>
            </div>
            <div className={`p-4 bg-red-500/20 rounded-2xl`}>
                <p className='w-8 text-center text-3xl text-red-400'>₱</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default SummaryCard
