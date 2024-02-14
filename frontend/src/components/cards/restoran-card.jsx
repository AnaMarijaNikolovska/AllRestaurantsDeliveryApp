import React from "react";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@mui/material";
import {ManageAccountsRounded} from "@mui/icons-material";
import {useAuthContext} from "../../configurations/AuthContext";
import {UserRole} from "../../services/user-service";
import RestourantImage from "../../assets/images/restorant-logo2.jpg";

function MoreVertIcon() {
    return null;
}

const RestoranCard = ({restoran}) => {
    const navigate = useNavigate();
    const {loggedUserRole} = useAuthContext();

    return (
        restoran != null &&
        <Card className={`card-zoom m-3 cursor-pointer`} onClick={() => navigate(`/restorants/${restoran.id}`)}>
            <CardHeader
                avatar={
                    restoran.manager.id === loggedUserRole?.roleId && loggedUserRole?.role === UserRole.Menager &&
                    <ManageAccountsRounded/>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={restoran.manager.korisnik.username.toUpperCase()}
                subheader="Manager"
            />
            <CardMedia
                component="img"
                height="200"
                image={RestourantImage}
                alt="Paella dish"
            />
            <CardContent className={" text-center"}>
                <Typography variant={"h5"}
                            className={"font-weight-bold mt-3 text-center"}
                >{restoran.ime}
                </Typography>
                <Typography className={"text-center card-description m-0 mb-4"}
                >{restoran.lokacija}
                </Typography>
                <Typography className={"text-center card-description m-0 mb-4"}
                > {restoran.rabotnoVreme}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default RestoranCard;