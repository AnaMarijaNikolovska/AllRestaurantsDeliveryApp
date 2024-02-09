import React from "react";
import Potrosuvac from "../../assets/images/regularUser.jpg";
import Menager from "../../assets/images/manager.jpg";
import Vozac from "../../assets/images/food-driver.jpg";
import Admin from "../../assets/images/admin.jpg";
import {Card, CardContent, Typography} from "@mui/material";
import {UserRole} from "../../services/user-service";

const RoleCard = ({role}) => {
    return (
        <Card variant="outlined" className={"role-card"}>
            <CardContent className={"d-flex flex-column align-content-center justify-content-center"}>
                <img className={"centered-image"} src={role === UserRole.Potrosuvac ? Potrosuvac
                    : role === UserRole.Menager ? Menager
                        : role === UserRole.Vozac ? Vozac
                            : Admin} alt={"team"} height={320}/>
                <Typography className={"text-center"} variant="h5">
                    {role}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default RoleCard;