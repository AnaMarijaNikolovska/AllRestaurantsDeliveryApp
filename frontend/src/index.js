import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    redirect,
    Route,
    RouterProvider
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Root from "./routes/root";
import Login from "./routes/user/login";
import {AuthProvider, SkipAuth} from "./configurations/AuthContext";
import Register from "./routes/user/register";
import StandardLayout from "./routes/standard-layout";
import ErrorPage from "./error-page";

const credentials = JSON.parse(sessionStorage.getItem("authData"));

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
if (credentials) {
    axios.defaults.headers.common['Authorization'] = credentials.userCredential;
}

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status === 404) {
        console.log('unauthorized, logging out ...');
        redirect('/');
    }
    return Promise.reject(error.response);
});


const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={
            <StandardLayout>
                <Root/>
            </StandardLayout>}/>,
        <Route
            path={"/login"}
            element={
                <StandardLayout>
                    <SkipAuth>
                        <Login/>
                    </SkipAuth>
                </StandardLayout>
            }/>,
        <Route
            path={"/register"}
            element={
                <StandardLayout>
                    <SkipAuth>
                        <Register/>
                    </SkipAuth>
                </StandardLayout>
            }
        />,
        <Route path="*" element={<Navigate to="/" replace/>}/>
    ])
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
