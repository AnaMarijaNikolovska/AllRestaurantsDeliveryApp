import React from "react";
import {Grid, Typography} from "@mui/material";
import {Navigate, useLoaderData, useParams} from "react-router-dom";
import {useAuthContext} from "../../configurations/AuthContext";
import PaymentCard from "../../components/cards/payment-card";

const UserPayments = () => {
    const {loggedUserRole} = useAuthContext();
    const {payments} = useLoaderData();
    const {userId} = useParams();

    return (loggedUserRole?.roleId != userId ? <Navigate to={"/"}/> :
            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                <Typography className={"mt-3"} variant={"h3"}>
                    Transaction History
                </Typography>

                <hr className={"horizontal-fancy"}/>

                <Grid container rowGap={3} rowSpacing={5} direction={"row"} justifyContent={"start"}>
                    {payments &&
                        payments.length > 0 &&
                        payments.map((payment) => (
                            <Grid key={payment.id} item md={4} className={"m-3"}>
                                <PaymentCard payment={payment}/>
                            </Grid>
                        ))}
                </Grid>
            </Grid>
    )
}

export default UserPayments;