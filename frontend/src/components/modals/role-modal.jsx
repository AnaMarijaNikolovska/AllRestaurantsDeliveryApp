import {Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography} from "@mui/material";
import RoleCard from "../cards/role-card";
import CloseIcon from "@mui/icons-material/Close";
import {UserRole} from "../../services/user-service";


const ChooseRole = ({roleset, ...props}) => {

    const handleRole = role => {
        props.onClose();
        roleset(role);
    }

    return (
        <Dialog
            {...props}
            disablebackdropclick="true"
            fullWidth={true}
            maxWidth={"lg"}
            aria-labelledby="choose-role-title"
        >
            <DialogTitle variant="h4" disabletypography="true" id={"choose-role-title"}
                         className={"text-center font-weight-bolder"}>
                Choose your role
                <IconButton className={"float-end"} aria-label="close" onClick={() => props.onClose()}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent className={"mb-3"}>
                <Grid container spacing={2}>
                    <Grid className={"border-effect"} onClick={() => handleRole(UserRole.Potrosuvac)} item md={4} lg={4}
                          xs={12}>
                        <RoleCard role={UserRole.Potrosuvac}/>
                    </Grid>
                    <Grid className={"border-effect"} onClick={() => handleRole(UserRole.Menager)} item md={4} lg={4}
                          xs={12}>
                        <RoleCard role={UserRole.Menager}/>
                    </Grid>
                    <Grid className={"border-effect"} onClick={() => handleRole(UserRole.Vozac)} item md={4} lg={4}
                          xs={12}>
                        <RoleCard role={UserRole.Vozac}/>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default ChooseRole;