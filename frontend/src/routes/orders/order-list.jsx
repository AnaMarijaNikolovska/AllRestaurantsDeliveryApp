import React from "react";
import {Grid, Typography} from "@mui/material";
import {useLoaderData, useSearchParams} from "react-router-dom";
import OrderCard from "../../components/cards/order-card";
import {useAuthContext} from "../../configurations/AuthContext";
import {UserRole} from "../../services/user-service";

const OrderList = () => {
    const {orders} = useLoaderData();
    const {loggedUserRole} = useAuthContext();
    const [searchParams, setSearchParams] = useSearchParams();

    [UserRole.Vozac, UserRole.Admin].includes(loggedUserRole?.role)
    return (orders &&
        <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
            <Typography className={"mt-3"} variant={"h3"}>
                {!searchParams.get("active") ? "All" : searchParams.get("active") === "true" ? "Active" : "Finished"} Orders
            </Typography>

            <hr className={"horizontal-fancy"}/>

            <Grid container rowGap={2} rowSpacing={2}>
                {orders &&
                    orders.length > 0 &&
                    orders.map((order) => (
                        <Grid key={order.id} item md={12} className={"m-3"}>
                            <OrderCard order={order}/>
                        </Grid>
                    ))}
            </Grid>
        </Grid>
    )
}

export default OrderList;