import React, { useState } from 'react'
import Input from '../components/Input';

import { LoaderCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authThunk';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AlarmCheckIcon } from 'lucide-react';
import { AlertTriangleIcon } from 'lucide-react';
import { assets } from '../assets/assets';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector((state) => state.auth)
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

    <div className="min-h-screen flex">
      {/* LEFT SIDE — Branding & Inclusive Insurance */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-white to-gray-200 text-gray-800 p-12 flex-col justify-center">
        {/* Logos */}
        <div className="flex items-center gap-6 mb-10">
          <img src={assets.logo_axa} alt="AXA" className="h-12" />
          <div className="w-px h-10 bg-gray-700" />
          <img src={assets.logo_cnaas} alt="CNAAS" className="h-12" />
        </div>

        <h1 className="text-xl font-bold leading-tight mb-6">
          Ensemble, innovons pour une protection accessible à tous.
        </h1>
      </div>

      {/* RIGHT SIDE — Login Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6">

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

          {/* Logos mobile */}
          <div className="lg:hidden flex justify-center gap-6 mb-6">
            <img src={assets.logo_axa} alt="AXA" className="h-10" />
            <img src={assets.logo_cnaas} alt="CNAAS" className="h-10" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Connexion
          </h2>

          <p className="text-gray-500 text-sm text-center mb-6">
            Accédez à votre espace partenaire
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4 flex items-center justify-content gap-2">
              <AlertTriangleIcon className='w-4 h-4' />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              label="Adresse e-mail"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
            <Input
              label="Mot de passe"
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
              ) : ("LOGIN")}
            </button>

          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            © 2026 AXA — Assurance Inclusive
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login