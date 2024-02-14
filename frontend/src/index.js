import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {redirect} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import {AuthProvider} from "./configurations/AuthContext";
import {toast} from "react-toastify";
import App from "./App";

const credentials = JSON.parse(sessionStorage.getItem("authData"));

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
if (credentials) {
    axios.defaults.headers.common['Authorization'] = credentials.userCredential;
}

axios.interceptors.response.use((response) => {
    if (response.config.method !== "get") {
        toast.success("Success", {
            toastId: "custom-id-success"
        })
    }
    return response;
}, function (error) {
    console.log(error);
    toast.error(error.message)

    if (error.response.status === 404) {
        redirect('/');
    }
    return Promise.reject(error.response);
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <App/>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
