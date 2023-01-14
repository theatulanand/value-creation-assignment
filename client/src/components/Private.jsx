import React from 'react';
import { useSelector } from 'react-redux/';
import { Navigate } from 'react-router-dom'

export const Private = ({ children }) => {
    const user = useSelector(store => store.auth.user);

    if (!user) {
        return <Navigate to="/login" />
    }
    return children;
}