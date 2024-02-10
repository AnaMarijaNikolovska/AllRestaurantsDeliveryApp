import {useState} from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {toast} from "react-toastify";
import {RegisterUser} from "../../services/user-service";
import {Link, redirect} from "react-router-dom";
import {Avatar, Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import ChooseRole from "../../components/modals/role-modal";

const Register = (props) => {
    const [showRoleModal, setShowRoleModal] = useState(true);
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        role: props?.location?.state?.role
    });

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
                redirect("login");
                toast("Successfuly registered")
            })
    }


    return (showRoleModal && (user.role === null || user.role === undefined) ?
            <ChooseRole open={showRoleModal} onClose={() => setShowRoleModal(false)} roleset={chooseRole}/>
            : <Container component="main" maxWidth="xs" className="register-container-custom">
                <Paper elevation={0} className={"d-flex flex-column align-items-center pt-5 register-paper-custom"}>
                    <Avatar>
                        <LockOutlinedIcon/>
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
                    </form>
                </Paper>
            </Container>
    )
}

export default Register;