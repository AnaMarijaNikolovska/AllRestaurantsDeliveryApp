import {Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography} from "@mui/material";
import RoleCard from "../cards/role-card";
import CloseIcon from "@mui/icons-material/Close";
import {UserRole} from "../../services/user-service";
import UserForm from "../forms/user-form";


const EditUserModal = ({user, ...props}) => {

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
                Edit user
                <IconButton className={"float-end"} aria-label="close" onClick={() => props.onClose()}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={"mb-3"}>
                <UserForm editUser={user} onClose={props.onClose}/>
            </DialogContent>
        </Dialog>
    )
}

export default EditUserModal;