import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import MenuItemCard from "./menu-item-card";
import {formatDate} from "../functions";
import {useAuthContext} from "../../configurations/AuthContext";
import {AssignOrderAdmin, AssignOrderDriver, OrderStatus, UpdateOrder} from "../../services/order-service";
import {useLocation, useNavigate} from "react-router-dom";
import {UserRole} from "../../services/user-service";

const OrderCard = ({order}) => {
    const [naracka, setNaracka] = useState(order ?? undefined);
    const {isAuthorized, loggedUserRole} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSaveNaracka = async (status) => {

        let updatedOrder = {
            potrosuvacId: naracka?.potrosuvac?.id,
            status: status,
            menuItems: naracka.narackaMenuItems.map(nmp => ({menuItemId: nmp?.menuItem?.id, quantity: nmp.quantity}))
        }

        await UpdateOrder(naracka.id, updatedOrder)
        navigate(location.pathname, {replace: true});
    }

    const handleAssignAdmin = async (status) => {

        let adminRequest = {
            adminId: loggedUserRole?.roleId,
            approvalStatus: status,
        }

        await AssignOrderAdmin(naracka.id, adminRequest)
        navigate(location.pathname, {replace: true});
    }

    const handleAssignVozac = async (status) => {

        let driverRequest = {
            vozacId: loggedUserRole?.roleId,
            deliveryStatus: status,
        }

        await AssignOrderDriver(naracka.id, driverRequest)
        navigate(location.pathname, {replace: true});
    }

    const handleAddRemoveToNaracka = async (menuItem) => {
        const existingIndex = naracka.narackaMenuItems.findIndex(narackaMenu => narackaMenu.menuItem.id === menuItem.menuItemId);

        if (existingIndex !== -1) {
            // If the menu item exists, update its quantity
            if (menuItem.quantity === 0) {
                // Show confirm alert
                const shouldRemove = window.confirm("Are you sure you want to remove this item?");
                if (shouldRemove) {
                    await setNaracka(prevState => ({
                        ...prevState,
                        narackaMenuItems: prevState.narackaMenuItems.filter((item, index) => index !== existingIndex)
                    }));
                }
            } else {
                await setNaracka(prevState => ({
                    ...prevState,
                    narackaMenuItems: prevState.narackaMenuItems.map((item, index) => {
                        if (index === existingIndex) {
                            return {...item, quantity: menuItem.quantity};
                        }
                        return item;
                    })
                }));
            }
        } else if (menuItem.quantity !== 0) {
            // If the menu item doesn't exist and its quantity is not 0, add it to the naracka
            await setNaracka(prevState => ({
                ...prevState,
                narackaMenuItems: [...prevState.narackaMenuItems, menuItem]
            }));
        }
    };

    return (
        naracka && <Card variant="outlined" className={"m-1"}>
            <CardHeader title={`NARACKA BROJ #${order.id}`}/>
            <CardContent className={"d-flex flex-column align-content-center justify-content-center"}>
                <Typography className={"text-center"} variant="h5">
                    {formatDate(order.datum)}
                </Typography>
                <Typography className={"text-center"} variant="h5">
                    {order.status}
                </Typography>

                {naracka.narackaMenuItems && naracka.narackaMenuItems.length > 0 && naracka.narackaMenuItems.map((narackaMenu) =>
                    <div key={narackaMenu.id}>
                        <MenuItemCard item={narackaMenu.menuItem} quantitynb={narackaMenu.quantity}
                                      itemchange={handleAddRemoveToNaracka}/>
                    </div>)}
            </CardContent>
            <CardActions>
                {isAuthorized(order?.potrosuvac?.id) && order?.status === OrderStatus.PendingUserApproval &&
                    <>
                        <Button onClick={() => handleSaveNaracka(OrderStatus.PendingUserApproval)}>Save changes</Button>
                        <Button onClick={() => handleSaveNaracka(OrderStatus.PendingAdminApproval)}>Finish
                            Order</Button>
                    </>}

                {loggedUserRole?.role === UserRole.Admin &&
                    <>
                        {order.status !== OrderStatus.Approved &&
                            <Button onClick={() => handleAssignAdmin(OrderStatus.Approved)}>Approve</Button>}
                        {order.status !== OrderStatus.Terminated &&
                            <Button onClick={() => handleAssignAdmin(OrderStatus.Terminated)}>Reject
                                Order</Button>}
                        {order.status !== OrderStatus.Finished &&
                            <Button onClick={() => handleAssignAdmin(OrderStatus.Finished)}>Finish
                                Order</Button>}
                    </>}

                {loggedUserRole?.role === UserRole.Vozac && order.status === OrderStatus.Approved &&
                    <>
                        < Button onClick={() => handleAssignVozac(OrderStatus.Delivering)}>Pick up Order</Button>
                        < Button onClick={() => handleAssignVozac(OrderStatus.Finished)}>Finish Order</Button>
                        < Button onClick={() => handleAssignVozac(OrderStatus.Terminated)}>Cancel Order</Button>
                    </>}
            </CardActions>
        </Card>
    )
}

export default OrderCard;