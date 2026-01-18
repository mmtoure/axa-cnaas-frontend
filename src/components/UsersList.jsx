import { Plus } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { User } from 'lucide-react';
import React from 'react'
import Table from './Table';

const columns = [
    {
        header:"Info", 
        accessor:"info"
    },
     {
        header:"Email",
        accessor:"email", 
        className:"hidden md:table-cell"
    },
     {
        header:"Téléphone",
        accessor:"téléphone", 
        className:"hidden md:table-cell"
    },
     {
        header:"Role",
        accessor:"role", 
        className:"hidden md:table-cell"
    },

      {
        header:"Actions",
        accessor:"actions", 

    }
]

const UsersList = ({usersData}) => {
    console.log("USERLIST",usersData);

    const renderRow = (item) =>(
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
               <td className='flex items-center gap-4 p-2'>
                <div className='flex flex-col'>
                    <h4 className='text-gray-500 font-semibold '>{item.fullName}</h4>
                    <p className='text-sm text-gray-500'>{item.email}</p>

                </div>
               </td>
            
                <td className='hidden md:table-cell'>{item.email}</td>
                <td className='hidden md:table-cell'>{item.phoneNumber}</td>
                <td className='hidden md:table-cell'>{item.role.name}</td>
                <td>
                    Actions
                </td>
            

        </tr>
    )
    
  return (
    <div className='card p-4'>
        <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold'>Utilisateurs source</h3>
            {usersData && <span className='text-sm text-gray-500'>{usersData.length} utilisateurs</span>}
        </div>

        {/* Table des utilisateurs */}       
        {usersData && usersData.length > 0 ? (
            <Table columns={columns} renderRow={renderRow} data={usersData} />
       
        ): (
            <p className='text-gray-500'>Aucun utilisateur trouvé.</p>

        )

        }
    
    </div>
  )
}



export default UsersList
