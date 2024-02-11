import React, {useState} from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {Grid, Typography} from "@mui/material";
import {useLoaderData} from "react-router-dom";
import LoginPhoto from "../../assets/images/delivery.jpg";
import UserDetailsPhoto from "../../assets/images/userDetailsBasicPhoto.jpg";


const UserDetails = ({id}) => {
    const {isAuthorized} = useAuthContext();
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const {user} = useLoaderData();

    return (user &&
        <Grid container component={"main"}>
            <Grid item xs={6} alignItems={"center"} justify={"space-between"}
                  className={"background-image mt-5"}
                  style={{backgroundImage: `url(${UserDetailsPhoto})`}}>
            </Grid>

            <Grid item xs={6} flexDirection={'column'} alignItems={"center"} justify={"space-between"}
                  className={"mt-5"}>
                <Typography className={"mt-3 mb-2"} variant={"h3"} alignContent={"center"}>
                    <b> User Details</b>
                </Typography>
                <Grid> <Typography className={"mt-3"} variant={"body1"}>
                    <b> Email: </b> {user.email}
                </Typography>
                </Grid>
                <Grid>
                    <Typography className={"mt-3"} variant={"body1"}>
                        <b> Username:</b> {user.email}
                    </Typography>
                </Grid>

            </Grid>

            {/*{openUpdateModal &&*/}
            {/*    <CreateEditLocationModal location={location} open={openUpdateModal}*/}
            {/*                             onClose={() => setOpenUpdateModal(false)}/>*/}
            {/*}*/}

        </Grid>
    )
}

export default UserDetails;