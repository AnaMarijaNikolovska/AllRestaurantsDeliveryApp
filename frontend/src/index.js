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
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import Root from "./routes/root";
import Login from "./routes/user/login";
import {AuthProvider, SkipAuth} from "./configurations/AuthContext";
import Register from "./routes/user/register";
import StandardLayout from "./routes/standard-layout";
import {rootLoader} from "./loaders/root-loader";
import RestorantDetails from "./routes/restourant/restourant-details";
import {restorantLoader} from "./loaders/restourant-loader";
import {userLoader, userOrderLoader, userPaymentLoader} from "./loaders/user-loader";
import UserDetails from "./routes/user/user-details";
import RestorantCreate from "./routes/restourant/restorant-create";
import OrderList from "./routes/orders/order-list";
import {orderLoader} from "./loaders/order-loader";
import RestorantsPage from "./routes/restourant/restaurants-page";
import {menuItemLoader} from "./loaders/menu-item-loader";
import MenuItemsListPage from "./routes/menuItems/menu-items-list-page";
import {PublishableStripeKey} from "./services/payment-service";
import UserOrders from "./routes/user/user-orders";
import UserPayments from "./routes/user/user-payments";
import {toast} from "react-toastify";

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

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" loader={rootLoader} element={
            <StandardLayout>
                <Root/>
            </StandardLayout>}/>,
        <Route path="/restorants" loader={rootLoader} element={
            <StandardLayout>
                <RestorantsPage/>
            </StandardLayout>}/>,
        <Route path="/restorants/create" element={<StandardLayout>
            <RestorantCreate/>
        </StandardLayout>}/>,
        <Route path="/orders" loader={orderLoader} element={<StandardLayout>
            <OrderList/>
        </StandardLayout>}/>,
        <Route path="/restorants/:restorantId" loader={restorantLoader} element={
            <StandardLayout>
                <RestorantDetails/>
            </StandardLayout>}/>,
        <Route path="/users/:userId" loader={userLoader} element={
            <StandardLayout>
                <UserDetails/>
            </StandardLayout>}/>,
        <Route path="/users/:userId/orders" loader={userOrderLoader} element={
            <StandardLayout>
                <UserOrders/>
            </StandardLayout>}/>,
        <Route path="/users/:userId/transactions-history" loader={userPaymentLoader} element={
            <StandardLayout>
                <UserPayments/>
            </StandardLayout>}/>,
        <Route path="/menu-items" loader={menuItemLoader} element={
            <StandardLayout>
                <MenuItemsListPage/>
            </StandardLayout>}/>,
        <Route
            path={"/login"}
            element={
                <SkipAuth>
                    <StandardLayout>
                        <Login/>
                    </StandardLayout>
                </SkipAuth>
            }/>,
        <Route
            path={"/register"}
            element={
                <SkipAuth>
                    <StandardLayout>
                        <Register/>
                    </StandardLayout>
                </SkipAuth>
            }
        />,
        <Route path="*" element={<Navigate to="/" replace/>}/>
    ])
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <RouterProvider router={router}/>
    </AuthProvider>
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
