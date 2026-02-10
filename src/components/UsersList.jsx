import { Plus } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { User } from 'lucide-react';
import React from 'react'
import Table from './Table';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { formatDate } from '../util/helper';

const columns = [
    {
        header:"Info", 
        accessor:"info",
        className:"text-left px-2 flex items-center gap-4"
    },
     {
        header:"Email",
        accessor:"email", 
        className:"hidden md:table-cell text-left px-2 flex items-center gap-4"
    },
     {
        header:"Téléphone",
        accessor:"téléphone", 
        className:"hidden md:table-cell text-left px-2 flex items-center gap-4"
            
    },
        {
        header:"Date création",
        accessor:"createdAt", 
        className:"hidden md:table-cell text-left px-2 flex items-center gap-4"
    },
            {
        header:"Statut",
        accessor:"status", 
        className:"hidden md:table-cell text-left px-2 flex items-center gap-4"
    },
     {
        header:"Role",
        accessor:"role", 
        className:"hidden md:table-cell text-left px-2 flex items-center gap-4"
    },
        {
        header:"Partenaire",
        accessor:"partenaire", 
        className:"hidden md:table-cell text-left px-2 flex items-center gap-4"
    },
    
      {
        header:"Actions",
        accessor:"actions",
        className:"flex items-center justify-center"

    }
]

const UsersList = ({usersData}) => {
    console.log("USERLIST",usersData);
    const [search, setSearch] = useState("");

     const filteredUsers = usersData?.filter((user) => {
  const term = search.toLowerCase();
  return (
      user.email?.toLowerCase().includes(term) ||
      user.phone?.toLowerCase().includes(term)
    );
  });

    const renderRow = (item) =>(
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
               <td className='flex items-center gap-4 p-2'>
                <div className='flex flex-col'>
                    <h4 className='text-gray-500 font-semibold '>{item.firstName + " "+ item.lastName} </h4>
                    <p className='text-sm text-gray-500'>{item.email}</p>

                </div>
               </td>
            
                <td className='hidden md:table-cell'>{item.email}</td>
                <td className='hidden md:table-cell'>{item.phoneNumber}</td>
                   <td className='hidden md:table-cell'>{formatDate(item.createdAt)}</td>
                      <td className='hidden md:table-cell'>{item.isActive? "Actif" : "Inactif"}</td>
                <td className='hidden md:table-cell'>{item.role.name}</td>
                  <td className='hidden md:table-cell'>{item?.partnerName}</td>
                <td className='flex items-center justify-center gap-1 px-2'>
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
         {/* Search */}
            <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un assuré..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-2 bg-gray-100 rounded-md text-sm
                          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

        {/* Table des utilisateurs */}       
        {filteredUsers && filteredUsers.length > 0 ? (
            <Table columns={columns} renderRow={renderRow} data={filteredUsers} />
       
        ): (
            <p className='text-gray-500'>Aucun utilisateur trouvé.</p>

        )

        }
    
    </div>
  )
}



export default UsersList
