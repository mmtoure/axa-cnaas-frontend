import React from 'react'
import Dashboard from '../../components/Dashboard'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllInsureds } from '../../features/insured/insuredThunk'
import { useSelector } from 'react-redux'
import { Plus } from 'lucide-react'
import InsuredList from '../../components/InsuredList'
import Modal from '../../components/Modal'
import {useNavigate } from "react-router-dom";
import { PlusCircle } from 'lucide-react'
import { Search } from 'lucide-react'

const Insured = () => {
const [openAddUserModal, setOpenAddUserModal] = useState(false);
const dispatch = useDispatch()
const navigate = useNavigate()
const [search, setSearch] = useState("");
const insuredsData = useSelector((state)=> state.insured.insureds)

 useEffect(() =>{
  dispatch(getAllInsureds())

 }, [dispatch])


 const filteredInsureds = insuredsData.filter((insured) => {
  const term = search.toLowerCase();

  return (
    insured.firstName?.toLowerCase().includes(term) ||
    insured.lastName?.toLowerCase().includes(term) ||
    insured.phoneNumber?.includes(term)
  );
});
return (
<Dashboard activeMenu="Assurés">
  <div className="bg-white rounded-lg shadow-sm p-6 m-3">
    
    {/* Header */}
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold text-gray-700">
        Gestion des assurés
      </h3>

      {/* Search */}
      <div className='flex items-center justify-content gap-2'>
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

      {/* Button Creation assuré */}

      <button
        type="button"
        aria-label="Créer un nouvel assuré"
        onClick={() => navigate("/insureds/create")}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-md
                   hover:bg-blue-700 transition
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <PlusCircle className="w-5 h-5" />
        Nouvel assuré
      </button>
      </div>
    </div>

    {/* Table */}
    <InsuredList insuredsData={filteredInsureds} />

    {/* Modal création assuré (optionnel) */}
    <Modal
      isOpen={openAddUserModal}
      onClose={() => setOpenAddUserModal(false)}
      title="Nouvel assuré"
    >
      {/* <AddInsuredForm /> */}
    </Modal>

  </div>
</Dashboard>
  )
}

export default Insured