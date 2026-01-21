import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Assures from "./pages/insureds/Insured"
import Groupements from "./pages/groups/GroupList"
import Agences from "./pages/Agences"
import Utilisateurs from "./pages/Utilisateurs"
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
import ClaimList from "./pages/claim/ClaimList"
import CreateClaim from "./pages/claim/CreateClaim"
import ClaimEdit from "./pages/claim/ClaimEdit"
import ClaimDetails from "./pages/claim/ClaimDetails"
import CreateGroupement from "./pages/groups/CreateGroupement"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />

          {/** Insureds routes */}
          <Route path="/insureds" element={<Insured />} />
          <Route path="/insureds/create" element={<CreateInsured />} />
          <Route path="/insureds/:id" element={<InsuredDetails />} />
          <Route path="/insureds/edit/:id" element={<InsuredEdit />} />
          <Route path="/insureds/:insuredId/claims/new" element={<CreateClaim />} />

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
          <Route path="/claims" element={<ClaimList />} />
          <Route path="/claims/create" element={<CreateClaim />} />
          <Route path="/claims/:id" element={<ClaimDetails />} />
          <Route path="/claims/edit/:id" element={<ClaimEdit />} />

          <Route path="/agences" element={<Agences />} />

          <Route path="/login" element={<Login />} />
          <Route path="/utilisateurs" element={<Utilisateurs />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/parametres" element={<Parametres />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
    
  )
}

export default App
