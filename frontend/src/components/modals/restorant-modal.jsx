import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestorantForm from "../forms/restorant-form";


const EditRestorantModal = ({restorant, ...props}) => {

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
                Edit Restorant
                <IconButton className={"float-end"} aria-label="close" onClick={() => props.onClose()}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={"mb-3"}>
                <RestorantForm restorant={restorant} onClose={props.onClose}/>
            </DialogContent>
        </Dialog>
    )
}

export default EditRestorantModal;