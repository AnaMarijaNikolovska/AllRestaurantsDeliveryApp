import {Button, Grid, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {RegisterUser} from "../../services/user-service";
import {toast} from "react-toastify";

const UserForm = (props
) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
        name: "",
        surname: "",
        email: "",
        roleType: props?.location?.state?.roleType
    });

    const chooseRole = role => {
        setUser({...user, roleType: role});
    }

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        RegisterUser(user)
            .then(() => {
                navigate("login");
                toast("Successfuly registered")
            })
    }


    return (<form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    onChange={handleChange("name")}
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    inputProps={{
                        minLength: 2,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    onChange={handleChange("surname")}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    inputProps={{
                        minLength: 2,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={handleChange("email")}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={handleChange("username")}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    inputProps={{
                        minLength: 2,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={handleChange("password")}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    inputProps={{
                        minLength: 6,
                    }}
                />
            </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
        >
            Sign Up
        </Button>
        <Grid container justify="flex-end" className={"mt-3"}>
            <Grid item>
                <Link to={"/login"}>
                    Already have an account? Sign in
                </Link>
            </Grid>
        </Grid>
    </form>)
}

export default UserForm;