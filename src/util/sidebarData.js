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
    roles: ["ADMIN", "MANAGER", "USER"]
  },
  {
    id: '02',
    label: 'Assurés',
    path: '/insureds',
    icon: User,
    roles: ["ADMIN", "MANAGER", "USER"]

  },
  {
    id: '03',
    label: 'Groupements',
    path: '/groups',
    icon: Users,
    roles: ["ADMIN", "MANAGER", "USER"]
  },
  {
    id: '04',
    label: 'Contracts',
    path: '/contracts',
    icon: FolderCheckIcon,
    roles: ["ADMIN", "MANAGER", "USER"]
  },

  {
    id: '05',
    label: 'Sinistres',
    path: '/sinistres',
    icon: FileWarning ,
    roles: ["ADMIN", "MANAGER", "USER"]
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
    roles: ["ADMIN"]
  },

  {
    id: '09',
    label: 'Agences',
    path: '/agences',
    icon: Home,
    roles: ["ADMIN"]

  },

  {
    id: '10',
    label: 'Paramètres',
    path: '/parametres',
    icon: Settings,
    roles: ["ADMIN"]
  },
];
