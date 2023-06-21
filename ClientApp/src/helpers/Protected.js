import React from 'react';
import { Navigate } from "react-router-dom";
const Protected = ({tempTestAuth, children }) => {
    //need to change variable of 'setAccessToken'
    if (!tempTestAuth){
        return <Navigate to='/' replace />;
    }
    return children;
}
export default Protected;