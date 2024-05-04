import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Protected = ({ children }) => {
    const { user } = UserAuth();
    if (!user) {
        // Redirect the user to the login page if not authenticated
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};

export default Protected;
