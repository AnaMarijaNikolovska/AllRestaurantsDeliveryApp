import React from 'react';
import Header from "../components/header";
import ErrorBoundary from "./error-wrapper";
import {ToastContainer} from "react-toastify";

const StandardLayout = ({children}) => {
    return (
        <ErrorBoundary>
            <ToastContainer/>
            <Header/>
            {children}
        </ErrorBoundary>
    );
};

export default StandardLayout;