import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Assures from "./pages/insureds/Insured"
import Groupements from "./pages/groups/GroupList"
import Agences from "./pages/Agences"
import Profiles from "./pages/Profiles"
import Parametres from "./pages/Parametres"
import CreateInsured from "./pages/insureds/CreateInsured"
import Insured from "./pages/insureds/Insured"
import { ToastContainer } from "react-toastify"
import GroupList from "./pages/groups/GroupList"
import GroupDetails from "./pages/groups/GroupDetails"
import GroupEdit from "./pages/groups/GroupEdit"
import InsuredDetails from "./pages/insureds/InsuredDetails"
import InsuredEdit from "./pages/insureds/InsuredEdit"
import CreateGroup from "./pages/groups/CreateGroup"
import { ContractList } from "./pages/contract/ContractList"
import CreateContract from "./pages/contract/CreateContract"
import { ContractEdit } from "./pages/contract/ContractEdit"
import ContractDetails from "./pages/contract/ContractDetails"
import CreateClaim from "./pages/claim/CreateClaim"
import ClaimEdit from "./pages/claim/ClaimEdit"
import ClaimDetails from "./pages/claim/ClaimDetails"
import CreateGroupement from "./pages/groups/CreateGroupement"
import InsuredPage from "./pages/insureds/InsuredPage"
import PrivateLayout from "./layouts/PrivateLayout"
import PrivateRoute from "./router/PrivateRoute"
import UsersListPage from "./pages/user/UersListPage"
import ClaimsListPage from "./pages/claim/ClaimsListPage"
import CreateMultiClaim from "./pages/claim/CreateMultiClaim"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login />} />
          {/* Protected */}
          <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Home />} />

              {/** Insureds routes */}
              <Route path="/insureds" element={<InsuredPage />} />
              <Route path="/insureds/create" element={<CreateInsured />} />
              <Route path="/insureds/:id" element={<InsuredDetails />} />
              <Route path="/insureds/edit/:id" element={<InsuredEdit />} />
              <Route path="/insureds/:insuredId/claims/new" element={<CreateMultiClaim />} />

              {/** Groups routes */}
              <Route path="/groups" element={<GroupList />} />
              <Route path="/groups/create" element={<CreateGroupement />} />
              <Route path="/groups/:id" element={<GroupDetails />} />
              <Route path="/groups/edit/:id" element={<GroupEdit />} />

              {/** Contracts routes */}
              <Route path="/contracts" element={<ContractList />} />
              <Route path="/contracts/create" element={<CreateContract />} />
              <Route path="/contracts/:id" element={<ContractDetails />} />
              <Route path="/contracts/edit/:id" element={<ContractEdit />} />

              {/** Claims routes */}
              <Route path="/claims" element={<ClaimsListPage />} />
              <Route path="/claims/create" element={<CreateMultiClaim />} />
              <Route path="/claims/:id" element={<ClaimDetails />} />
              <Route path="/claims/edit/:id" element={<ClaimEdit />} />

              <Route path="/agences" element={<Agences />} />

              <Route path="/login" element={<Login />} />
              <Route path="/users" element={<UsersListPage />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/parametres" element={<Parametres />} />
            </Route>
            {/* Default */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
    
  )
}

export default App
