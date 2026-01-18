import React from 'react'
import Input from './Input';
import { useState } from 'react';


import { EraserIcon } from 'lucide-react';
import { FileWarningIcon } from 'lucide-react';
import { BatteryWarning } from 'lucide-react';
import { MessageCircleWarningIcon } from 'lucide-react';


const AddUserForm = () => {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        
    }


  return (
    <div>
        <form className="mx-auto" onSubmit={handleSubmit}>
            <Input
                label="Prénom"
                type="text"
                placeholder="Entrez le prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
                label="Nom"
                type="text"
                placeholder="Entrez le nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <Input
                label="Email"
                type="email"
                placeholder="Entrez l'email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                label="Mot de passe"
                type="password"
                placeholder="Entrez le mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className='flex items-center gap-2 text-red-800 text-center bg-red-50 rounded p-2 mb-5'>
                <MessageCircleWarningIcon className='w-4 h-4 ' />
                <p className="">{error}</p>
            </div>}
            <button 
                type="submit"
                className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                disabled={isLoading}
            >
                {isLoading ? 'Ajout en cours...' : 'Enregistrer l\'utilisateur'}
            </button>            
        </form>
    </div>
  )
}

export default AddUserForm