import { FolderArchiveIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'
import { FolderX } from 'lucide-react'
import React from 'react'

const EmptyState = ({title, description}) => {
    
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center gap-4">
      <Inbox className='w-25 h-25 text-slate-400' />
      <h2 className="text-xl font-semibold text-gray-800">
        {title}
      </h2>
      <p className="text-gray-500 mt-2 max-w-md">
        {description}
      </p>
    </div>
  )
}

export default EmptyState