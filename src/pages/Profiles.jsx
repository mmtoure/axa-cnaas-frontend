import React,{useEffect} from 'react'
import Dashboard from '../components/Dashboard'
import { useDispatch } from 'react-redux'
import { me } from '../features/user/userThunk'

const Profiles = () => {
  const dispatch = useDispatch()

      useEffect(() =>{
        const response =dispatch(me())
        console.log("RESPONSE", response);
        
      },[])
  return (
    <div className='space-y-6'> 
      <Dashboard activeMenu="Profiles">
        
      </Dashboard>
    </div>
  )
}

export default Profiles