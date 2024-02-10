import React, {useState} from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {Grid, Typography} from "@mui/material";
import {useLoaderData} from "react-router-dom";

const UserDetails = ({id}) => {
    const {isAuthorized} = useAuthContext();
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const {user} = useLoaderData();

    return (user &&
        <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
            <Grid container alignItems={"center"} justify={"space-between"}>
                {user.email}
                <Typography className={"mt-3"} variant={"body1"}>
                    {user.username}
                </Typography>
            </Grid>

            <Typography>
            </Typography>
            <hr className={"horizontal-fancy"}/>

            {/*{openUpdateModal &&*/}
            {/*    <CreateEditLocationModal location={location} open={openUpdateModal}*/}
            {/*                             onClose={() => setOpenUpdateModal(false)}/>*/}
            {/*}*/}

        </Grid>
    )
}

export default UserDetails;