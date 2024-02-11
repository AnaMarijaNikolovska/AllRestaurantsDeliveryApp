import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Icon,
    TextField,
    Typography
} from "@mui/material";
import {truncate} from "../functions";
import CreateEditMenuItemModal from "../modals/menu-item-modal";
import {DeleteMenuItem} from "../../services/menu-item-service";
import {useAuthContext} from "../../configurations/AuthContext";
import {UserRole} from "../../services/user-service";
import {Add, AddCircle, RemoveCircle} from "@mui/icons-material";
import MenuItem from "../../assets/images/menuItem.jpg";
import UserDetailsPhoto from "../../assets/images/userDetailsBasicPhoto.jpg";
import PersonIcon from "@mui/icons-material/Person";
import PaidIcon from '@mui/icons-material/Paid';

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
            className={`card-zoom team-card m-3 `}>
            <CardContent className={"cursor-pointer"}>
                <Grid container direction={"row"}>
                    <Grid>
                        <img src={MenuItem} height={'100'}/>

                    </Grid>
                    <Grid direction={"row"}>
                        <Grid> <Typography variant={"h5"}
                                           className={"font-weight-bold mt-3 p-1"}>
                            {item.ime}
                        </Typography></Grid>
                        <Grid direction={"column"}> <Typography className={"card-description p-1"}>
                            $ {item.cena}
                        </Typography></Grid>
                    </Grid>
                </Grid>

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