import React, {useState} from "react";
import Potrosuvac from "../../assets/images/regularUser.jpg";
import Menager from "../../assets/images/manager.jpg";
import Vozac from "../../assets/images/food-driver.jpg";
import Admin from "../../assets/images/admin.jpg";
import {Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import {UserRole} from "../../services/user-service";
import MenuItemCard from "./menu-item-card";
import {formatDate} from "../functions";
import {useAuthContext} from "../../configurations/AuthContext";
import {OrderStatus} from "../../services/order-service";

const OrderCard = ({order}) => {
    const [naracka, setNaracka] = useState(order);
    const {isAuthorized, loggedUserRole} = useAuthContext();

    const handleAddRemoveToNaracka = async (menuItem) => {
        const existingIndex = naracka.narackaMenuItems.findIndex(narackaMenu => narackaMenu.menuItem.id === menuItem.menuItemId);

        if (existingIndex !== -1) {
            // If the menu item exists, update its quantity
            await setNaracka(prevState => ({
                ...prevState,
                narackaMenuItems: prevState.narackaMenuItems.map((item, index) => {
                    if (index === existingIndex) {
                        return {...item, quantity: menuItem.quantity};
                    }
                    return item;
                })
            }));
        } else {
            // If the menu item doesn't exist, add it to the naracka
            await setNaracka(prevState => ({
                ...prevState,
                narackaMenuItems: [...prevState.narackaMenuItems, menuItem]
            }));
        }
    };

    return (
        naracka && <Card variant="outlined" className={"m-1"}>
            <CardHeader title={`NARACKA BROJ #${naracka.id}`}/>
            <CardContent className={"d-flex flex-column align-content-center justify-content-center"}>
                <Typography className={"text-center"} variant="h5">
                    {formatDate(naracka.datum)}
                </Typography>
                <Typography className={"text-center"} variant="h5">
                    {naracka.status}
                </Typography>

                {naracka.narackaMenuItems && naracka.narackaMenuItems.length > 0 && naracka.narackaMenuItems.map((narackaMenu) =>
                    <div key={narackaMenu.id}>
                        <MenuItemCard item={narackaMenu.menuItem} quantitynb={narackaMenu.quantity}
                                      itemchange={handleAddRemoveToNaracka}/>
                    </div>)}
            </CardContent>
            <CardActions>
                {isAuthorized(naracka.potrosuvac.id) && naracka.status === OrderStatus.PendingUserApproval && <Button>Finish Order</Button>}
            </CardActions>
        </Card>
    )
}

export default OrderCard;