import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DriverVehicleForm from "../forms/driver-vehicle-form";


const CreateUpdateVehicleModal = ({vehicle, ...props}) => {

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
                {vehicle ? "Update" : "Add"} Vehicle
                <IconButton className={"float-end"} aria-label="close" onClick={() => props.onClose()}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={"mb-3"}>
                <DriverVehicleForm vehicle={vehicle}/>
            </DialogContent>
        </Dialog>
    )
}

export default CreateUpdateVehicleModal;