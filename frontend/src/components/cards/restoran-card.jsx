import React from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {truncate} from "../functions";

const RestoranCard = ({restoran}) => {
    const navigate = useNavigate();

    return (
        restoran != null &&
        <Card
            className={`card-zoom team-card m-3 text-center`}>
            <CardContent className={"cursor-pointer"} onClick={() => navigate(`/restorants/${restoran.id}`)}>
                <Avatar className={"profile-avatar-large"} src={'https://i.pravatar.cc/300'}/>
                <Typography variant={"h5"}
                            className={"font-weight-bold mt-3 text-center"}
                >{restoran.ime}
                </Typography>
                <Typography className={"text-center card-description m-0 mb-4"}
                >{restoran.lokacija}
                </Typography>
                <Typography className={"text-center card-description m-0 mb-4"}
                >{restoran.rabotnoVreme}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default RestoranCard;