import React,{useState} from 'react'
import Input from '../components/Input';

import { LoaderCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authThunk';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AlarmCheckIcon } from 'lucide-react';
import { AlertTriangleIcon } from 'lucide-react';

const Login = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const {loading, error} = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
            dispatch(loginUser({ email, password }))
                .unwrap()
                .then(() => {
                    navigate("/dashboard");
                })
                .catch((error) => {
                    console.log(error.message);
                    
                });
    };
  return (

    <div className='h-screen w-full bg-gray-100 flex justify-center items-center overflow-hidden'>
        <div className="relative z-10 w-full max-w-md px-6">
         <div className="bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold text-black text-center mb-2">
                Welcome Back
            </h3>
            <p className="text-sm text-slate-700 text-center mb-6">
                Please login to your account
            </p>
              {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4 flex items-center justify-content gap-2">
            <AlertTriangleIcon className='w-4 h-4' />
            <p>{error}</p>
          </div>
        )}

            <form onSubmit={handleSubmit} className="space-y-4">
                
                    <Input 
                        label="Email Address" 
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                       
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="*********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button disabled={loading} type="submit" className={`bg-blue-900 w-full  text-white py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'cursor-not-allowed opacity-70' : ''}  flex justify-center items-center`}>
                       {loading ? (
                        <>
                            <LoaderCircle className="animate-spin mr-2 inline-block" size={20} />
                            Logging in...
                        </>
                       ):("LOGIN")}
                    </button>

            </form> 
         </div>
        </div>
       
    </div>
  )
}

export default Login