import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuItemForm from "../forms/menu-item-form";


const CreateEditMenuItemModal = ({menuItem, restorantId, ...props}) => {

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
                {menuItem ? "Edit" : "Create"} Menu Item
                <IconButton className={"float-end"} aria-label="close" onClick={() => props.onClose()}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={"mb-3"}>
                <MenuItemForm menuItem={menuItem} restorantId={restorantId} onClose={props.onClose}/>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEditMenuItemModal;