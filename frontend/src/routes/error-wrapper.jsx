import React, { useState, useEffect } from 'react';
import ErrorPage from "../error-page";

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const errorHandler = (error) => {
            console.error('Error:', error);
            setHasError(true);
        };

        window.addEventListener('error', errorHandler);

        return () => {
            window.removeEventListener('error', errorHandler);
        };
    }, []);

    if (hasError) {
        return <ErrorPage />;
    }

    return children;
};

export default ErrorBoundary;