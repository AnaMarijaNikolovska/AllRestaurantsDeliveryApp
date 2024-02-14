import {useLoaderData} from "react-router-dom";
import {Grid} from "@mui/material";
import RestoranCard from "../components/cards/restoran-card";
import LoginPhoto from "../assets/images/delivery.jpg";
import HomePage from "../assets/images/AllRestaurantsHomePage.jpg"

export default function Root() {

    return (
        <Grid container component={"main"} style={{backgroundImage: `url(${HomePage})`}} className={"background-image"}>
        </Grid>
    );
}