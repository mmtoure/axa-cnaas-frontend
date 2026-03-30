import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Assures from "../pages/insureds/Insured"
import Groupements from "../pages/groups/GroupList"
import Agences from "../pages/Agences"
import Profiles from "../pages/partners/PartnersList"
import Parametres from "../pages/Parametres"
import CreateInsured from "../pages/insureds/CreateInsured"
import Insured from "../pages/insureds/Insured"
import { ToastContainer } from "react-toastify"
import GroupList from "../pages/groups/GroupList"
import GroupDetails from "../pages/groups/GroupDetails"
import GroupEdit from "../pages/groups/GroupEdit"
import InsuredDetails from "../pages/insureds/InsuredDetails"
import InsuredEdit from "../pages/insureds/InsuredEdit"
import CreateGroup from "../pages/groups/CreateGroup"
import { ContractList } from "../pages/contract/ContractList"
import CreateContract from "../pages/contract/CreateContract"
import { ContractEdit } from "../pages/contract/ContractEdit"
import ContractDetails from "../pages/contract/ContractDetails"
import CreateClaim from "../pages/claim/CreateClaim"
import ClaimEdit from "../pages/claim/ClaimEdit"
import ClaimDetails from "../pages/claim/ClaimDetails"
import CreateGroupement from "../pages/groups/CreateGroupement"
import InsuredPage from "../pages/insureds/InsuredPage"
import PrivateLayout from "../layouts/PrivateLayout"
import PrivateRoute from "../router/PrivateRoute"
import UsersListPage from "../pages/user/UersListPage"
import ClaimsListPage from "../pages/claim/ClaimsListPage"
import CreateMultiClaim from "../pages/claim/CreateMultiClaim"
import CreateUser from "../pages/user/CreateUser"
import Partenaires from "../pages/partners/PartnersList"
import CreatePartner from "../pages/partners/CreatePartner"
import PartnersList from "../pages/partners/PartnersList"
import PartnerDetails from "../pages/partners/PartnerDetails"
import CreatePricings from "../pages/partners/CreatePricings"
import PartnerListCard from "../pages/partners/PartnerListCard"
import GroupPage from "../pages/groups/GroupPage"
import Report from "../pages/Report"
import Layout from "../layouts/Layout"
import Login from "../pages/Login"
import Home from "../pages/Home"

const AppRouter = () => {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              {/* Protected */}
              <Route path="/dashboard" element={<Home />} />
              <Route path="/reports" element={<Report />} />
              {/** Insureds routes */}
              <Route path="/insureds" element={<InsuredPage />} />
              <Route path="/insureds/create" element={<CreateInsured />} />
              <Route path="/insureds/:id" element={<InsuredDetails />} />
              <Route path="/insureds/edit/:id" element={<InsuredEdit />} />
              <Route path="/insureds/:insuredId/sinistres/new" element={<CreateMultiClaim />} />

              {/** Groups routes */}
              <Route path="/groups" element={<GroupPage />} />
              <Route path="/groups/create" element={<CreateGroupement />} />
              <Route path="/groups/:id" element={<GroupDetails />} />
              <Route path="/groups/edit/:id" element={<GroupEdit />} />

              {/** Contracts routes */}
              <Route path="/contracts" element={<ContractList />} />
              <Route path="/contracts/create" element={<CreateContract />} />
              <Route path="/contracts/:id" element={<ContractDetails />} />
              <Route path="/contracts/edit/:id" element={<ContractEdit />} />

              {/** Claims routes */}
              <Route path="/sinistres" element={<ClaimsListPage />} />
              <Route path="/sinistres/create" element={<CreateMultiClaim />} />
              <Route path="/sinistres/:id" element={<ClaimDetails />} />
              <Route path="/sinistres/edit/:id" element={<ClaimEdit />} />

              <Route path="/agences" element={<Agences />} />

              <Route path="/login" element={<Login />} />
              <Route path="/users" element={<UsersListPage />} />
              <Route path="/users/create" element={<CreateUser />} />

              {/** Partners routes */}
              <Route path="/partners" element={<PartnerListCard />} />
              <Route path="/partners/create" element={<CreatePartner />} />
              <Route path="/partners/:id" element={<PartnerDetails />} />
              <Route path="/partners/:id/pricings/create" element={<CreatePricings />} />
              <Route path="/parametres" element={<Parametres />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />

    </div>
  )
}

export default AppRouter