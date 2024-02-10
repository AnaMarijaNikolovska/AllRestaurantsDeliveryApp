import React, {useState} from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {Grid, Typography} from "@mui/material";
import {useLoaderData} from "react-router-dom";

const RestorantDetails = ({id}) => {
    const {isAuthorized} = useAuthContext();
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const {restorant} = useLoaderData();


    return (restorant &&
        <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
            <Grid container alignItems={"center"} justify={"space-between"}>
                {restorant.ime}
                <Typography className={"mt-3"} variant={"body1"}>
                    {restorant.lokacija}
                </Typography>
            </Grid>

            <Typography>
                {restorant.rabotnoVreme}
            </Typography>
            <hr className={"horizontal-fancy"}/>

            {/*{openUpdateModal &&*/}
            {/*    <CreateEditLocationModal location={location} open={openUpdateModal}*/}
            {/*                             onClose={() => setOpenUpdateModal(false)}/>*/}
            {/*}*/}

        </Grid>
    )
}

export default RestorantDetails;