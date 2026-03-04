import { CheckCircle } from 'lucide-react'
import { Users } from 'lucide-react'
import { User2 } from 'lucide-react'
import { FolderOpen } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import KpiCard from './KpiCard'
import { User } from 'lucide-react'
import { Users2 } from 'lucide-react'
import { UserLock } from 'lucide-react'
import { XCircle } from 'lucide-react'

const StatsGrid = ({data}) => {
  return (
      <div className="p-2 space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <KpiCard
                title="Total Assurés"
                value={data?.nbInsureds}
                icon={User2}
                color="bg-blue-100 text-blue-600"
              />
        
              <KpiCard
                title="Total Groupements"
                  value={data?.nbGroups}
                icon={Users2}
                color="bg-red-100 text-red-600"
              />
              <KpiCard
                title="Total Sinistres"
                value={data?.openClaims}
                icon={FolderOpen}
                color="bg-yellow-100 text-yellow-600"
              />
          
           
            </div>
          </div>
  )
}

export default StatsGrid