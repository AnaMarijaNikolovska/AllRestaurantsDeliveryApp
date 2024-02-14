import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {truncate} from "../functions";
import CreateEditMenuItemModal from "../modals/menu-item-modal";
import {DeleteMenuItem} from "../../services/menu-item-service";
import {useAuthContext} from "../../configurations/AuthContext";
import {UserRole} from "../../services/user-service";
import {AddCircle, RemoveCircle, Restaurant} from "@mui/icons-material";
import MenuItem from "../../assets/images/menuItem.jpg";

const MenuItemCard = ({item, itemchange, quantitynb, detectAdminAction, skipChanges = false}) => {
    const {loggedUserRole, isAuthorized} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [quantity, setQuantity] = useState(quantitynb ?? 0);

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

        if (detectAdminAction) {
            detectAdminAction(true)
        }
    }

    const handleEdit = () => {
        setOpenUpdateModal(false);
        navigate(location.pathname);

        if (detectAdminAction) {
            detectAdminAction(true)
        }
    }

    return (
        item != null &&
        <Card
            className={`card-zoom m-3 `}>
            <CardContent className={"cursor-pointer"}>
                <Grid container direction={"row"} alignItems={"center"}>
                    <Grid item md={3}>
                        <img src={MenuItem} height={'100'} alt={"food"}/>
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant={"h5"}
                                    className={"font-weight-bold p-1"}>
                            {truncate(item.ime, 15, 30)}
                        </Typography>
                        <Typography className={"card-description p-1"}>
                            {item.cena} MKD
                        </Typography>
                    </Grid>
                    {itemchange && <Grid item md={3} className={"d-flex flex-column"}>
                        <Typography className={"card-description p-1"} align={"center"}>
                            <b>{quantity} </b> items
                        </Typography>

                        {loggedUserRole?.role === UserRole.Potrosuvac && !skipChanges &&
                            <Grid container item justifyContent={"space-around"}>
                                <Button color="error" onClick={handleMenuOrderQuantityChange(quantity - 1)}>
                                    <RemoveCircle/>
                                </Button>
                                <Button onClick={handleMenuOrderQuantityChange(quantity + 1)}>
                                    <AddCircle/></Button></Grid>
                        }
                        <Typography className={"card-description mt-1 p-1"} align={"center"}>
                            Price: <b>{quantity * item.cena}</b> MKD
                        </Typography>
                    </Grid>}

                    <Grid item md={12} className={"mt-2"}>
                        <Link to={`/restorants/${item.restoran.id}`}>
                            <Restaurant/> {truncate(item.restoran.ime)}
                        </Link>
                    </Grid>
                </Grid>

            </CardContent>
            <CardActions>
                {(isAuthorized(item.restoran?.manager?.id) || loggedUserRole?.role === UserRole.Admin) &&
                    <>
                        <Button onClick={() => setOpenUpdateModal(true)}>
                            Edit
                        </Button>
                        <Button onClick={() => handleDelete(item?.id)}>Delete</Button>
                    </>}
            </CardActions>

            {openUpdateModal &&
                <CreateEditMenuItemModal menuItem={item} restorantId={item.restoran.id} open={openUpdateModal}
                                         onClose={handleEdit}/>}
        </Card>
    )
}

export default MenuItemCard;