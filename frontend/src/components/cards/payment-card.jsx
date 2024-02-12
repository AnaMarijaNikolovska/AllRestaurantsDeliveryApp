import React from "react";
import Potrosuvac from "../../assets/images/regularUser.jpg";
import Menager from "../../assets/images/manager.jpg";
import Vozac from "../../assets/images/food-driver.jpg";
import Admin from "../../assets/images/admin.jpg";
import {Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {UserRole} from "../../services/user-service";
import {formatDate} from "../functions";

const PaymentCard = ({payment}) => {
    return (
        <Card variant="elevation" className={"card-zoom"}>
            <CardHeader title={`Transaction Number #${payment.id}`}/>
            <CardContent>
                <Grid container direction={"column"} justifyContent={"start"} alignItems={"start"}>
                    <Typography className={"text-center"} variant="h5">
                        <b>Order Number: </b> #{payment.naracka.id}
                    </Typography>
                    <Typography className={"text-center"} variant="h5">
                        <b>Total :</b> {payment.iznos} MKD
                    </Typography>
                    <Typography className={"text-center"} variant="h5">
                        <b>Transaction Type: </b> {payment.nacinNaPlakjane}
                    </Typography>
                    <Typography className={"text-center"} variant="h5">
                        <b>Date: </b> {formatDate(payment.naracka.datum)}
                    </Typography>
                    <Typography className={"text-center"} variant="h5">
                        <b>Order Status:</b> {payment.naracka.status}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PaymentCard;