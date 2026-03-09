import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllGroups, getGroups } from '../../features/group/groupThunk';
import GroupCard from '../../components/GroupCard';
import Dashboard from '../../components/Dashboard';
import { PlusCircle } from 'lucide-react';

const GroupPage = () => {
  const dispatch = useDispatch()
  const { groups, content, totalPages, currentPage } = useSelector((state) => state.group)
  const navigate = useNavigate()
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllGroups())
    dispatch(getGroups({ page: 0, size: 10 }));
  }, [dispatch])
  return (
    <Dashboard activeMenu="Groupements">
    <div className="p-4 min-h-screen">
       <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-700">
            Gestion des groupements
          </h3>

          {/* Button Creation group */}
          <button
            type="button"
            aria-label="Créer un nouvel assuré"
            onClick={() => navigate("/groups/create")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-md
                        hover:bg-blue-700 transition
                        focus:outline-none focus:ring-2 focus:ring-blue-400">
            <PlusCircle className="w-5 h-5" />
            Créer un groupement
          </button>
        </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
    </Dashboard>
  );
};


export default GroupPage