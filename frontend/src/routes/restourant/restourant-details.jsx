import React, {useState} from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {Button, Grid, Typography} from "@mui/material";
import {useLoaderData, useLocation, useNavigate} from "react-router-dom";
import EditRestorantModal from "../../components/modals/restorant-modal";
import CreateEditMenuItemModal from "../../components/modals/menu-item-modal";
import MenuItemCard from "../../components/cards/menu-item-card";
import {CreateOrder, OrderStatus} from "../../services/order-service";
import {UserRole} from "../../services/user-service";
import {ShoppingCart} from "@mui/icons-material";

const RestorantDetails = ({id}) => {
    const {isAuthorized, loggedUserRole} = useAuthContext();
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openMenuItemModal, setOpenMenuItemModal] = useState(false);
    const {restorant} = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();

    const [naracka, setNaracka] = useState({
        potrosuvacId: loggedUserRole?.roleId,
        status: OrderStatus.PendingUserApproval,
        menuItems: []
    })

    const handleAddRemoveToNaracka = async (menuItem) => {
        const existingMenuItem = naracka.menuItems.find(item => item.menuItemId === menuItem.menuItemId);

        if (existingMenuItem) {
            // If the menu item exists, update its quantity
            await setNaracka(prevState => ({
                ...prevState,
                menuItems: prevState.menuItems.map(item => {
                    if (item.menuItemId === menuItem.menuItemId) {
                        return {...item, quantity: menuItem.quantity};
                    }
                    return item;
                })
            }));
        } else {
            // If the menu item doesn't exist, add it to the naracka
            await setNaracka(prevState => ({
                ...prevState,
                menuItems: [...prevState.menuItems, menuItem]
            }));
        }
    };

    const handleNarackaSubmit = async (status) => {
        setNaracka({...naracka, [status]: status});
        await CreateOrder(naracka);

        window.alert("Success");
    }

    const handleCreateMenuItem = () => {
        navigate(location.pathname);
        setOpenMenuItemModal(false)
    }


    return (restorant &&
        <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
            <Grid container alignItems={"center"} justify={"space-between"}>
                {restorant.ime}
                <Typography className={"mt-3"} variant={"body1"}>
                    {restorant.lokacija}
                </Typography>
            </Grid>

            <Typography>
                {restorant.rabotnoVreme}
            </Typography>
            <hr className={"horizontal-fancy"}/>

            <Grid container alignItems={"center"} justify={"space-between"}>
                <h1>Manager: </h1>
                <Typography className={"mt-3"} variant={"body1"}>
                    {restorant.manager?.id}
                </Typography>
                <Typography className={"mt-3"} variant={"body1"}>
                    {restorant.manager?.korisnik?.username}
                </Typography>
            </Grid>

            {loggedUserRole?.role === UserRole.Potrosuvac &&
                <>
                    <Button onClick={() => handleNarackaSubmit(OrderStatus.PendingUserApproval)}>Add to
                        Cart <ShoppingCart/> </Button>
                    <Button onClick={() => handleNarackaSubmit(OrderStatus.PendingAdminApproval)}>Finish Order</Button>
                </>}

            {isAuthorized(restorant?.manager?.id) &&
                <Grid>
                    <Button onClick={() => setOpenUpdateModal(true)}>
                        Update Restorant
                    </Button>
                    <Button onClick={() => setOpenMenuItemModal(true)}>
                        Create Menu Item
                    </Button>
                </Grid>
            }

            {restorant.menuItems &&
                restorant.menuItems.length > 0 &&
                restorant.menuItems.map((menuItem) => (
                    <Grid key={menuItem.id} item xs={12} md={6} lg={4}>
                        <MenuItemCard item={menuItem} restorant={restorant} itemchange={handleAddRemoveToNaracka}/>
                    </Grid>
                ))}

            {openUpdateModal &&
                <EditRestorantModal restorant={restorant} open={openUpdateModal}
                                    onClose={() => setOpenUpdateModal(false)}/>
            }

            {openMenuItemModal &&
                <CreateEditMenuItemModal restorantId={restorant.id} open={openMenuItemModal}
                                         onClose={handleCreateMenuItem}/>}

        </Grid>
    )
}

export default RestorantDetails;