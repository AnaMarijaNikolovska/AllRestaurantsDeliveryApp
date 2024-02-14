import {Button, Grid, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {UpdateUser, UserRole} from "../../services/user-service";

const UserForm = ({editUser, ...props}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: editUser?.username ?? "",
        password: editUser?.password ?? "",
        email: editUser?.email ?? "",
        address: editUser?.address ?? "",
        phoneNumber: editUser?.phoneNumber ?? "",
        role: props.editUser?.role ?? ""
    });

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleSubmit = async event => {
        event.preventDefault();

        await UpdateUser(editUser.id, user)
        // navigate(0);
        props.onClose();
    }

    return (<form onSubmit={handleSubmit} className={"m-3"}>
        <Grid container spacing={2}>
            {editUser.role === UserRole.User &&
                <>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleChange("address")}
                            name="address"
                            variant="outlined"
                            fullWidth
                            value={user.address}
                            id="address"
                            label="Address"
                            inputProps={{
                                minLength: 2,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleChange("phoneNumber")}
                            variant="outlined"
                            value={user.phoneNumber}
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            inputProps={{
                                minLength: 2,
                            }}
                        />
                    </Grid>
                </>}
            <Grid item xs={12}>
                <TextField
                    onChange={handleChange("email")}
                    variant="outlined"
                    required
                    fullWidth
                    value={user.email}
                    id="email"
                    label="Email Address"
                    name="email"
                />
            </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            className={"mt-3"}
        >
            Update
        </Button>
    </form>)
}

export default UserForm;