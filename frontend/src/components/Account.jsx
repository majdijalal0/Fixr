import React from 'react'

import { useState } from 'react';

import Login from './Login';

import Signup from './Signup'; 

const Account = ({ isOpen, setIsOpen }) => {
    const [view, setView] = useState('login');
    
    const handleClose = () => setIsOpen(false);

    if (!isOpen) return null;

    return (
        <div>
            {view === 'login' ? (
                <Login setView={setView} onClose={handleClose} />
            ) : (
                <Signup setView={setView} onClose={handleClose} />
            )}
        </div>
    );
};

export default Account;