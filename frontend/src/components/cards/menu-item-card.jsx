import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Avatar, Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import {truncate} from "../functions";
import CreateEditMenuItemModal from "../modals/menu-item-modal";
import {DeleteMenuItem} from "../../services/menu-item-service";
import {useAuthContext} from "../../configurations/AuthContext";
import {UserRole} from "../../services/user-service";
import {Add, AddCircle, RemoveCircle} from "@mui/icons-material";

const MenuItemCard = ({item, restorant, itemchange, quantitynb}) => {
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {loggedUserRole, isAuthorized} = useAuthContext();

    const [quantity, setQuantity] = useState(quantitynb ?? 0)

    const handleMenuOrderQuantityChange = (number) => event => {
        if (number < 0) {
            return;
        }

        setQuantity(number)
        const orderMenuItem = {menuItemId: item?.id, quantity: number};
        itemchange(orderMenuItem);
    }

    const handleDelete = async (id) => {
        await DeleteMenuItem(id);
        navigate(location.pathname);
    }

    const handleEdit = () => {
        setOpenUpdateModal(false)
        navigate(location.pathname);
    }

    return (
        item != null &&
        <Card
            className={`card-zoom team-card m-3 text-center`}>
            <CardContent className={"cursor-pointer"}>
                <Typography variant={"h5"}
                            className={"font-weight-bold mt-3 text-center"}
                >{item.ime}
                </Typography>
                <Typography className={"text-center card-description m-0 mb-4"}
                >{item.cena}
                </Typography>
            </CardContent>
            <CardActions>
                {isAuthorized(restorant?.manager?.id) &&
                    <>
                        <Button onClick={() => setOpenUpdateModal(true)}>
                            Edit
                        </Button>
                        <Button onClick={() => handleDelete(item?.id)}>Delete</Button>
                    </>}
                {loggedUserRole?.role === UserRole.Potrosuvac && <>
                    <Button color="error" onClick={handleMenuOrderQuantityChange(quantity - 1)}>
                        <RemoveCircle/>
                    </Button>
                    {quantity}
                    <Button onClick={handleMenuOrderQuantityChange(quantity + 1)}>
                        <AddCircle/></Button></>}
            </CardActions>

            {openUpdateModal &&
                <CreateEditMenuItemModal menuItem={item} restorantId={restorant.id} open={openUpdateModal}
                                         onClose={handleEdit}/>}
        </Card>
    )
}

export default MenuItemCard;