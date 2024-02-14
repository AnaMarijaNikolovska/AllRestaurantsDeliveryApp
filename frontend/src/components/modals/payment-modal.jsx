import StripeCheckout from "react-stripe-checkout";
import {Button, Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {CreatePayment, PaymentType, PublishableStripeKey} from "../../services/payment-service";
import {useAuthContext} from "../../configurations/AuthContext";
import {calculateTotalPrice} from "../functions";
import {AttachMoneyOutlined, CreditCard} from "@mui/icons-material";
import React, {useState} from "react";
import {OrderStatus, UpdateOrder} from "../../services/order-service";
import {useLocation, useNavigate} from "react-router-dom";

const PaymentModal = ({naracka, ...props}) => {

    const {loggedUserRole, ownershipChanges} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const generateToken = async token => {
        const requestPayment = {
            potrosuvacId: loggedUserRole?.roleId,
            token: token.id,
            totalPrice: calculateTotalPrice(naracka?.narackaMenuItems),
            paymentType: PaymentType.DebitCard,
            narackaId: naracka.id
        }

        await CreatePayment(requestPayment);
        ownershipChanges(null);
        navigate(location.pathname, {replace: true});
        props.onClose();
    }

    const handleCashPayment = async () => {
        let totalPrice = calculateTotalPrice(naracka?.narackaMenuItems);
        const approval = window.confirm(`Are you sure you want to proceed with your order ? \n Total Amount to pay: ${totalPrice} `);

        let paymentRequest = {
            potrosuvacId: naracka?.potrosuvac?.id,
            narackaId: naracka?.id,
            paymentType: PaymentType.Cash,
            totalPrice: totalPrice
        }

        if (approval) {
            let updatedOrder = {
                potrosuvacId: naracka?.potrosuvac?.id,
                status: OrderStatus.PendingAdminApproval,
                menuItems: naracka.narackaMenuItems.map(nmp => ({
                    menuItemId: nmp?.menuItem?.id,
                    quantity: nmp.quantity
                }))
            }

            await UpdateOrder(naracka.id, updatedOrder)
            await CreatePayment(paymentRequest);
            ownershipChanges(null);
            navigate(0);
            props.onClose();
        }
    }

    const [open, setOpen] = useState(false);

    return (
        naracka && naracka.potrosuvac &&
        <Dialog
            {...props}
            disablebackdropclick="true"
            fullWidth={true}
            maxWidth={"md"}
        >
            <DialogTitle variant="h4" disabletypography="true" id={"choose-role-title"}
                         className={"text-center font-weight-bolder"}>
                What will be your payment method ?
                <IconButton color={"success"} className={"float-end"} aria-label="close"
                            onClick={() => props.onClose()}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={"mb-3 d-flex justify-content-evenly"}>
                <Button variant={"contained"} color={"success"} size={"small"}
                        onClick={() => handleCashPayment()}>
                    Cash <AttachMoneyOutlined/>
                </Button>

                <StripeCheckout
                    amount={calculateTotalPrice(naracka?.narackaMenuItems) * 100}
                    open={open}
                    image={"https://t4.ftcdn.net/jpg/04/73/84/61/360_F_473846184_0k637f6855ZJqaulKqAmgJTEVGVibR1P.jpg"}
                    name={naracka.potrosuvac.korisnik?.username}
                    email={naracka.potrosuvac.korisnik?.email}
                    shippingAddress
                    billingAddress
                    description={`Your total is ${calculateTotalPrice(naracka?.narackaMenuItems)} MKD`}
                    panelLabel={"Pay Order"}
                    currency="MKD"
                    label={<>Card <CreditCard/></>}
                    stripeKey={PublishableStripeKey}
                    allowRememberMe
                    onClose={() => setOpen(false)}
                    token={generateToken}
                />
            </DialogContent>
        </Dialog>
    )
}

export default PaymentModal;