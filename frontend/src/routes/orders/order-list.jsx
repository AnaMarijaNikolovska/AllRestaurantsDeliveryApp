import React, {useState} from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {Grid, Typography} from "@mui/material";
import {useLoaderData} from "react-router-dom";
import MenuItemCard from "../../components/cards/menu-item-card";
import RoleCard from "../../components/cards/role-card";
import OrderCard from "../../components/cards/order-card";

const OrderList = ({id}) => {
    const {isAuthorized} = useAuthContext();
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const {orders} = useLoaderData();
    console.log(orders);

    return (orders &&
        <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
            <Grid container alignItems={"center"} justify={"space-between"}>
                <Typography className={"mt-3"} variant={"body1"}>
                </Typography>
            </Grid>
test test
            <Typography>
            </Typography>
            <hr className={"horizontal-fancy"}/>

            <Grid container rowGap={2} rowSpacing={2}>
                {orders &&
                    orders.length > 0 &&
                    orders.map((order) => (
                        <Grid key={order.id} item md={6} lg={6}>
                            <OrderCard order={order}/>
                        </Grid>
                    ))}
            </Grid>

            {/*{openUpdateModal &&*/}
            {/*    <CreateEditLocationModal location={location} open={openUpdateModal}*/}
            {/*                             onClose={() => setOpenUpdateModal(false)}/>*/}
            {/*}*/}

        </Grid>
    )
}

export default OrderList;