import {Grid} from "@mui/material";
import RestoranCard from "../../components/cards/restoran-card";
import {Link, useLoaderData} from "react-router-dom";
const RestorantsPage= () => {
    const loaderData = useLoaderData();
    return(
        <Grid container>
            {loaderData.restorants &&
                loaderData.restorants.length > 0 &&
                loaderData.restorants.map((restoran) => (
                    <Grid key={restoran.id} item xs={12} md={6} lg={4}>
                        <RestoranCard restoran={restoran}/>
                    </Grid>
                ))}
            <Link to={"/restorants/create"}>Create </Link>
        </Grid>
    )
}
export default RestorantsPage;
