import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex gap-5">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col md:ml-64 ml-20">

        <Header setIsOpen={setIsOpen} />

        <main className="p-6 bg-gray-100 min-h-screen">
          <Outlet /> 
        </main>

      </div>
    </div>
  )
}


export default Layout