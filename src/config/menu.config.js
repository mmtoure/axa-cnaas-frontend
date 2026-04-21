// sidebarData.js
import { HomeIcon } from 'lucide-react';
import { HousePlus } from 'lucide-react';
import { UserStar } from 'lucide-react';
import { FolderCheckIcon } from 'lucide-react';
import { FolderCodeIcon } from 'lucide-react';
import { FileWarning } from 'lucide-react';
import { File } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { Group } from 'lucide-react';
import { Home } from 'lucide-react';
import { Space, Boxes } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  User,
  Settings,
} from 'lucide-react';

export const menuConfig = [
  {
    id: '01',
    label: 'Tableau de bord',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ["ADMIN", "MANAGER", "USER"],
    partner: ["LG", "AXA", "CNAAS"]
  },
  {
    id: '02',
    label: 'Assurés',
    path: '/insureds',
    icon: User,
    roles: ["ADMIN", "MANAGER", "USER"],
    partner: ["LG", "AXA", "CNAAS"]

  },
  {
    id: '03',
    label: 'Groupements',
    path: '/groups',
    icon: Boxes,
    roles: ["ADMIN", "MANAGER", "USER"],
    partner: ["AXA", "CNAAS"]
  },
  {
    id: '04',
    label: 'Contrats',
    path: '/contracts',
    icon: FolderCheckIcon,
    roles: ["SUPER_ADMIN","ADMIN", "MANAGER", "USER"],


  },

  {
    id: '05',
    label: 'Sinistres',
    path: '/sinistres',
    icon: FileWarning ,
    roles: ["SUPER_ADMIN","ADMIN", "MANAGER", "USER"],
  
  },

  {
    id: '07',
    label: 'Utilisateurs',
    path: '/users',
    icon: Users,
    roles: ['ADMIN', 'MANAGER'],

  },
  {
    id: '08',
    label: 'Partenaires',
    path: '/partners',
    icon: UserStar,
    roles: ["SUPER_ADMIN"],
  
  },

  {
    id: '09',
    label: 'Agences',
    path: '/agences',
    icon: Home,
    roles: ["SUPER_ ADMIN","ADMIN", "MANAGER"],

  },

    {
    id: '09',
    label: 'Zones',
    path: '/zones',
    icon: Home,
    roles: ["SUPER_ADMIN", "ADMIN"],
   

  },

  {
    id: '10',
    label: 'Paramètres',
    path: '/parametres',
    icon: Settings,
    roles: ["SUPER_ADMIN"],
  },
];
