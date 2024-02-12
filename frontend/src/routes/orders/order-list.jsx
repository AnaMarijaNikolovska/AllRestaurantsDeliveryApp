import React from "react";
import {Grid, Typography} from "@mui/material";
import {useLoaderData} from "react-router-dom";
import OrderCard from "../../components/cards/order-card";

const OrderList = ({id}) => {
    const {orders} = useLoaderData();

    return (orders &&
        <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
            <Typography className={"mt-3"} variant={"h3"}>
                All Orders
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