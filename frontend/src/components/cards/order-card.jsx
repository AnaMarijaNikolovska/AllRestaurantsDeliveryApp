import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import MenuItemCard from "./menu-item-card";
import {calculateTotalPrice, formatDate} from "../functions";
import {useAuthContext} from "../../configurations/AuthContext";
import {AssignOrderAdmin, AssignOrderDriver, OrderStatus, UpdateOrder} from "../../services/order-service";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {UserRole} from "../../services/user-service";
import PaymentModal from "../modals/payment-modal";

const OrderCard = ({order}) => {
    const [naracka, setNaracka] = useState(order ?? undefined);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const {isAuthorized, loggedUserRole} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const [detectAdminAction, setDetectAdminAction] = useState(false);

    const handleSaveNaracka = async (status) => {
        let updatedOrder = {
            potrosuvacId: naracka?.potrosuvac?.id,
            status: status,
            menuItems: naracka.narackaMenuItems.map(nmp => ({menuItemId: nmp?.menuItem?.id, quantity: nmp.quantity}))
        }

        setNaracka({...naracka, status: status});
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
        naracka && <Card variant="elevation" className={"m-1"}>
            <CardHeader title={`NARACKA BROJ #${order.id}`}
                        subheader={<div>
                            <div>User:
                                <Link
                                    to={`/users/${order?.potrosuvac?.korisnik?.id}`}> {order?.potrosuvac?.korisnik?.username} </Link>
                            </div>
                            <div>Address: {order?.potrosuvac?.address}</div>
                            <div>Contact: {order?.potrosuvac?.phoneNumber}</div>
                        </div>}/>
            <CardContent className={"d-flex flex-column align-content-center justify-content-center"}>
                <Typography className={"text-center"} variant="h5">
                    {formatDate(order.datum)}
                </Typography>
                <Typography className={"text-center mt-1"} variant="h5">
                    <i>{order.status}</i>
                </Typography>

                {naracka.narackaMenuItems && naracka.narackaMenuItems.length > 0 && naracka.narackaMenuItems.map((narackaMenu) => narackaMenu.quantity > 0 &&
                    <MenuItemCard key={narackaMenu.id} item={narackaMenu.menuItem} quantitynb={narackaMenu.quantity}
                                  skipChanges={naracka.status !== OrderStatus.PendingUserApproval}
                                  detectAdminAction={() => window.location.reload()}
                                  itemchange={handleAddRemoveToNaracka}/>
                )}
            </CardContent>
            <CardActions>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"h4"}>
                            Total Price: {calculateTotalPrice(naracka?.narackaMenuItems)} MKD
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {isAuthorized(order?.potrosuvac?.id) && order?.status === OrderStatus.PendingUserApproval &&
                            <>
                                <Button onClick={() => handleSaveNaracka(OrderStatus.PendingUserApproval)}>Save
                                    changes</Button>
                                <Button onClick={() => setOpenPaymentModal(true)}>Pay now</Button>
                            </>}

                        {loggedUserRole?.role === UserRole.Admin && ![OrderStatus.Finished, OrderStatus.Terminated, OrderStatus.PendingUserApproval].includes(order.status) &&
                            <>
                                {![OrderStatus.Finished, OrderStatus.Approved, OrderStatus.Delivering].includes(order.status) &&
                                    <Button onClick={() => handleAssignAdmin(OrderStatus.Approved)}>Approve</Button>}
                                {![OrderStatus.Finished, OrderStatus.Terminated].includes(order.status) &&
                                    <Button onClick={() => handleAssignAdmin(OrderStatus.Terminated)}>Reject
                                        Order</Button>}
                                {![OrderStatus.Finished, OrderStatus.PendingAdminApproval].includes(order.status) &&
                                    <Button onClick={() => handleAssignAdmin(OrderStatus.Finished)}>Finish
                                        Order</Button>}
                            </>}

                        {loggedUserRole?.role === UserRole.Vozac && [OrderStatus.Approved, OrderStatus.Delivering].includes(order.status) &&
                            <>
                                {order.status !== OrderStatus.Delivering &&
                                    < Button onClick={() => handleAssignVozac(OrderStatus.Delivering)}>Pick up
                                        Order</Button>}
                                {![OrderStatus.Finished, OrderStatus.PendingAdminApproval, OrderStatus.Approved].includes(order.status) &&
                                    < Button onClick={() => handleAssignVozac(OrderStatus.Finished)}>Finish
                                        Order</Button>}
                                < Button onClick={() => handleAssignVozac(OrderStatus.Terminated)}>Cancel Order</Button>
                            </>}
                    </Grid>
                </Grid>
            </CardActions>
            {openPaymentModal &&
                <PaymentModal naracka={naracka} open={openPaymentModal} onClose={() => setOpenPaymentModal(false)}/>}
        </Card>
    )
}

export default OrderCard;