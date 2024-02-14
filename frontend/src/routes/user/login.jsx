import {useState} from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {BasicAuth, LoginUser} from "../../services/user-service";
import {Link, redirect, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Avatar, Button, Grid, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginPhoto from "../../assets/images/delivery.jpg";
import PersonIcon from '@mui/icons-material/Person';

const Login = () => {
    const {loggedUser, login} = useAuthContext();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const response = await LoginUser(user);

        if (!response) {
            return;
        }

        let authData = {
            userCredential: BasicAuth(response.username, response.password),
            userId: response.id,
            userRole: response.role,
            userRoleId: response.roleId,
            activeOwnershipId: response.activeOwnershipId
        }

        let roleUser = {
            roleId: response.roleId,
            role: response.role,
            activeOwnershipId: response.activeOwnershipId
        }

        sessionStorage.setItem('authData', JSON.stringify(authData));

        login(response.id, roleUser);
        navigate("/");
    }

    return (loggedUser ? redirect("/") :
            <Grid container component={"main"}>
                <Grid item xs={false} sm={4} md={7} className={"background-image login-text"}
                      style={{backgroundImage: `url(${LoginPhoto})`}}> All Restaurants Delivery </Grid>
                <Grid item xs={12} sm={8} md={5} elevation={6} className={"flex-column-align-justify-center"}>
                    <div className={"d-flex flex-column align-items-center"}>
                        <Avatar>
                            <PersonIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={"full-width mt-1"} onSubmit={handleSubmit}>
                            <TextField
                                onChange={handleChange("username")}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange("password")}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                            <div className={"text-right"}>
                                <Link to={"/register"}>
                                    Don't have an account? Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
    );
}

export default Login;