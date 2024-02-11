import React, {useState} from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {Button, Grid, Paper, Typography} from "@mui/material";
import {useLoaderData} from "react-router-dom";
import LoginPhoto from "../../assets/images/delivery.jpg";
import UserDetailsPhoto from "../../assets/images/userDetailsBasicPhoto.jpg";
import {UserRole} from "../../services/user-service";
import CreateUpdateVehicleModal from "../../components/modals/vehicle-modal";


const UserDetails = ({id}) => {
    const {isAuthorized, loggedUserRole} = useAuthContext();
    const [openVehicleModal, setOpenVehicleModal] = useState(false);
    const {user, vehicle} = useLoaderData();
    console.log(vehicle);

    return (user &&
        <Grid container component={"main"}>
            <Grid item xs={6} alignItems={"center"} justify={"space-between"}
                  className={"background-image mt-5"}
                  style={{backgroundImage: `url(${UserDetailsPhoto})`}}>
            </Grid>

            <Grid item xs={6} flexDirection={'column'} alignItems={"center"} justify={"space-between"}
                  className={"mt-5"}>
                <Grid>
                    <Typography className={"mt-3 mb-2"} variant={"h3"} alignContent={"center"}>
                        <b> User Details</b>
                    </Typography>
                </Grid>

                <Grid> <Typography className={"mt-3"} variant={"body1"}>
                    <b> Email: </b> {user.email}
                </Typography>
                </Grid>
                <Grid>
                    <Typography className={"mt-3"} variant={"body1"}>
                        <b> Username:</b> {user.username}
                    </Typography>
                </Grid>

                <Grid>
                    <Typography className={"mt-3"} variant={"body1"}>
                        <b> Role:</b> {user.role}
                    </Typography>
                </Grid>

                {loggedUserRole?.role === UserRole.Vozac &&
                    <Grid className={"mt-5"}>
                        {vehicle &&
                            <>
                                <Typography variant={"h5"}>Vehicle Info</Typography>
                                <Typography className={"mt-3"} variant={"body1"}>
                                    <b> Type:</b> {vehicle.tip}
                                </Typography>
                                <Typography className={"mt-3"} variant={"body1"}>
                                    <b> Registration:</b> {vehicle.registracija}
                                </Typography>
                            </>}
                        <hr className={"horizontal-fancy"}/>
                        <Button onClick={() => setOpenVehicleModal(true)}>{vehicle ? "Edit" : "Add"} Vehicle</Button>
                    </Grid>
                }

            </Grid>


            {openVehicleModal &&
                <CreateUpdateVehicleModal vehicle={vehicle} open={openVehicleModal}
                                          onClose={() => setOpenVehicleModal(false)}/>}

        </Grid>
    )
}

export default UserDetails;