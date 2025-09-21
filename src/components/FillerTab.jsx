import React from 'react'

function FillerTab({filter, setFilter}) {
  return (
    <div className='p-8 border-b border-white/10'>
      <div className='flex space-x-2 bg-gray-800/50 rounded-2xl p-2'>
        {['all', 'expense', 'income'].map((filterType)=>(
          <button key={filterType} onClick={() => setFilter(filterType)}
            className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${filter === filterType ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg ' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}>
              {filterType === 'all' ? 'all entries' : filterType}
            </button>
        ))}
      </div>
    </div>
  )
}

export default FillerTab
