// sidebarData.js
import { HomeIcon } from 'lucide-react';
import { HousePlus } from 'lucide-react';
import { Group } from 'lucide-react';
import { Home } from 'lucide-react';
import { Space } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  User,
  Settings,
} from 'lucide-react';

export const sidebarData = [
  {
    id: '01',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
   {
    id: '02',
    label: 'Assurés',
    path: '/insureds',
    icon: Users,
  },
    {
    id: '03',
    label: 'Groupements',
    path: '/groups',
    icon: Group,
  },
      {
    id: '04',
    label: 'Contracts',
    path: '/contracts',
    icon: Group,
  },

        {
    id: '05',
    label: 'Sinistres',
    path: '/claims',
    icon: Group,
  },
  {
    id: '06',
    label: 'Utilisateurs',
    path: '/users',
    icon: Users,
    roles: ['ADMIN'],
  },
  {
    id: '07',
    label: 'Profiles',
    path: '/profiles',
    icon: User,
  },

    {
    id: '08',
    label: 'Agences',
    path: '/agences',
    icon: Home,
  },

  {
    id: '09',
    label: 'Paramètres',
    path: '/parametres',
    icon: Settings,
  },

 

  
];
