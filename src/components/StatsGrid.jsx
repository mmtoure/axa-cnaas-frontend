import { ArrowRight } from 'lucide-react'
import React from 'react'

const StatsGrid = () => {
  return (

    <div className='my-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>

        <div className='bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-300 group'>
            <div className='flex flex-col items-start justify-between'>
                    <p className='text-sm font-medium text-slate-600 mb-2'>Total assurés</p>
                    <p className='text-3xl font-bold text-slate-800 dark:text-white mb-2'>
                        100
                    </p>
            </div>
             
        </div>

        <div className='bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-300 group'>
            <div className='flex flex-col items-start justify-between'>
                    <p className='text-sm font-medium text-slate-600 mb-2'>Assurés actifs</p>
                    <p className='text-3xl font-bold text-slate-800 dark:text-white mb-2'>
                        100
                    </p>
            </div>
             
        </div>

         <div className='bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-300 group'>
            <div className='flex flex-col items-start justify-between'>
                    <p className='text-sm font-medium text-slate-600 mb-2'>Assurés inactifs</p>
                    <p className='text-3xl font-bold text-slate-800 dark:text-white mb-2'>
                        10
                    </p>
            </div>
             
        </div>

        <div className='bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-300 group'>
            <div className='flex flex-col items-start justify-between'>
                    <p className='text-sm font-medium text-slate-600 mb-2'>Souscriptions du mois</p>
                    <p className='text-3xl font-bold text-slate-800 dark:text-white mb-2'>
                        100
                    </p>
            </div>
             
        </div>
        
    </div>
  )
}

export default StatsGrid