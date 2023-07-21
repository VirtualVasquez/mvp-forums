import React from 'react';
import { Navigate } from "react-router-dom";
const Protected = ({localToken, children }) => {
    if (!localToken){
        return <Navigate to='/' replace />;
    }
    return children;
}
export default Protected;