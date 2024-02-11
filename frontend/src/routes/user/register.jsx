import {useState} from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {toast} from "react-toastify";
import {RegisterUser, UserRole} from "../../services/user-service";
import {Link, redirect, useNavigate} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import {Avatar, Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import ChooseRole from "../../components/modals/role-modal";

const Register = (props) => {
    const [showRoleModal, setShowRoleModal] = useState(true);
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        address: "",
        phoneNumber: "",
        role: props?.location?.state?.role
    });
    const navigate = useNavigate();
    const chooseRole = role => {
        setUser({...user, role: role});
    }

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    };

    const handleSubmit = event => {
        event.preventDefault();

        RegisterUser(user)
            .then(() => {
                navigate("/login");
                toast("Successfuly registered")
            })
    }


    return (showRoleModal && (user.role === null || user.role === undefined) ?
            <ChooseRole open={showRoleModal} onClose={() => setShowRoleModal(false)} roleset={chooseRole}/>
            : <Container component="main" maxWidth="xs" className="register-container-custom">
                <Paper elevation={0} className={"d-flex flex-column align-items-center pt-5 register-paper-custom"}>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5" className={"mb-3"}>
                        Sign up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
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
                            {user.role === UserRole.Potrosuvac &&
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={handleChange("address")}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="address"
                                            label="Address"
                                            type="text"
                                            id="address"
                                            inputProps={{
                                                minLength: 6,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={handleChange("phoneNumber")}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="phoneNumber"
                                            label="Phone Number"
                                            type="text"
                                            id="phoneNumber"
                                            inputProps={{
                                                minLength: 6,
                                            }}
                                        />
                                    </Grid>
                                </>
                            }

                        </Grid>
                        <br/>

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
                    </form>
                </Paper>
            </Container>
    )
}

export default Register;