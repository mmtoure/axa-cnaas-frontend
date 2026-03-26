import React from 'react'

const HistoriesTab = ({histories}) => {
  return (
    <div>
        
    
          <h2 className="font-semibold text-lg mb-4">Historique</h2>

          <div className="space-y-3">
            {histories.map(h => (
              <div
                key={h.id}
                className="border-l-4 border-blue-500 pl-4"
              >
                <p className="font-medium">{h.status}</p>

                <p className="text-sm text-gray-500">
                  {h?.firstName || "System"} {h?.lastName || ""}
                </p>

                <p className="text-sm">{h.comment}</p>

                <p className="text-xs text-gray-400">
                  {h.actionDate}
                </p>
              </div>
            ))}
          </div>
  
        
    </div>
  )
}

export default HistoriesTab