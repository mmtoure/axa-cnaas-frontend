import React from 'react'
import { formatDate } from '../util/helper'
import StatusBadge from './StatusBadge'
import { useNavigate } from 'react-router-dom'

const TableRecentInsureds = ({ recentInsureds }) => {
    const navigate = useNavigate()
    return (
            
                    <div className="bg-white p-4 rounded-xl shadow-md">
                        <div className='flex items-center justify-between mb-4'>
                            <div>
                             
                                <p className='text-sm text-slate-500'>
                                    Les derniers assurés créés:
                                </p>
                            </div>
                            <button className='text-blue-500 hover:text-blue-700 text-sm font-medium' onClick={()=>navigate("/insureds")}>voir +</button>
                        </div>
                        {/** Table */}
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='text-left text-xs  text-slate-600'>Prénom et Nom</th>
                                        <th className='text-left text-xs  text-slate-600'>Téléphone</th>
                                        <th className='text-left text-xs  text-slate-600'>Date création</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentInsureds?.length > 0 && (
                                        recentInsureds.map((item, index) => (

                                            <tr key={index} className='border border-slate-200/50  hover:bg-slate-50/50 transition-colors'>
                                                <td className="text-left p-1">
                                                    <span className='text-xs  text-blue'>{item.firstName}</span>
                                                </td>
                                                <td className="text-left p-1">
                                                    <span className='text-xs  text-blue'>{item.phoneNumber}</span>
                                                </td>
                                           
                                                <td className="text-left p-1">
                                                    <span className='text-xs text-blue'>{formatDate(item.createdAt)}</span>
                                                </td>
                                            </tr>

                                        ))
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                
             
        

    )
}

export default TableRecentInsureds