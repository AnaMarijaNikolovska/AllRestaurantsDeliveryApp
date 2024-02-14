import './App.css';
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import {rootLoader} from "./loaders/root-loader";
import StandardLayout from "./routes/standard-layout";
import Root from "./routes/root";
import RestorantsPage from "./routes/restourant/restorant-list";
import {inactiveMenagerLoader, userLoader, userOrderLoader, userPaymentLoader} from "./loaders/user-loader";
import RestorantCreate from "./routes/restourant/restorant-create";
import {orderLoader} from "./loaders/order-loader";
import OrderList from "./routes/orders/order-list";
import {restorantLoader} from "./loaders/restourant-loader";
import RestorantDetails from "./routes/restourant/restorant-details";
import UserDetails from "./routes/user/user-details";
import UserOrders from "./routes/user/user-orders";
import UserPayments from "./routes/user/user-payments";
import {menuItemLoader} from "./loaders/menu-item-loader";
import MenuItemsListPage from "./routes/menuItems/menu-items-list-page";
import {SkipAuth, useAuthContext} from "./configurations/AuthContext";
import Login from "./routes/user/login";
import Register from "./routes/user/register";
import React from "react";

function App() {
    const {loggedUserRole, ownershipChanges} = useAuthContext();

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
            <Route path="/restorants/create" loader={inactiveMenagerLoader} element={<StandardLayout>
                <RestorantCreate/>
            </StandardLayout>}/>,
            <Route path="/orders" loader={orderLoader} element={<StandardLayout>
                <OrderList/>
            </StandardLayout>}/>,
            <Route path="/restorants/:restorantId"
                   loader={(request) => restorantLoader({request, loggedUserRole, ownershipChanges})}
                   element={
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

    return <RouterProvider router={router}/>
}

export default App;
