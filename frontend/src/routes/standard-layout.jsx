import React from 'react';
import Header from "../components/header";
import ErrorBoundary from "./error-wrapper";

const StandardLayout = ({children}) => {
    return (
        <ErrorBoundary>
            <Header/>
            {children}
        </ErrorBoundary>
    );
};

export default StandardLayout;