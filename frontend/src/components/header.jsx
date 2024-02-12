import React from "react";
import {useAuthContext} from "../configurations/AuthContext"
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from "react-router-dom";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FaceIcon from '@mui/icons-material/Face';
import {UserRole} from "../services/user-service";

const Header = props => {
    const {loggedUser, loggedUserRole, logout} = useAuthContext();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <LocalDiningIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to='/'
                    sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    All Restaurants
                </Typography>

                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                        <MenuItem onClick={() => navigate("/restaurants")}>
                            <Typography textAlign="center">Restaurants</Typography>
                        </MenuItem>

                        <MenuItem onClick={() => navigate("/menuItems")}>
                            <Typography textAlign="center">Menu Items</Typography>
                        </MenuItem>

                    </Menu>
                </Box>
                <LocalDiningIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    to="/"
                    sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'},
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    All Restaurants
                </Typography>
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>

                    <Button onClick={() => navigate("/restorants")}
                            sx={{my: 2, color: 'white', display: 'block'}}>
                        Restaurants
                    </Button>
                    <Button
                        onClick={() => navigate("/menu-items")}
                        sx={{my: 2, color: 'white', display: 'block'}}
                    >
                        Menu Items
                    </Button>
                    {[UserRole.Vozac, UserRole.Admin].includes(loggedUserRole?.role) && <Button
                        onClick={() => navigate("/orders")}
                        sx={{my: 2, color: 'white', display: 'block'}}
                    >
                        Orders
                    </Button>}
                </Box>
                <Box sx={{flexGrow: 0}}>
                    {!loggedUser ? <div className={"d-flex"}>
                            <Link to="/login" className={"nav-link h6 m-2"}>LOGIN</Link>
                            <Link to="/register" className={"nav-link h6 m-2"}>REGISTER</Link>
                        </div> :
                        <>

                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <FaceIcon style={{color: 'white'}}/>
                            </IconButton>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => navigate(`/users/${loggedUser}`)}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                {loggedUserRole.role === UserRole.Potrosuvac &&
                                    <MenuItem
                                        onClick={() => navigate(`/users/${loggedUserRole.roleId}/orders`, {state: {loggedUserId: loggedUserRole.roleId}})}>
                                        < Typography textAlign="center"> My Orders</Typography>
                                    </MenuItem>}
                                {loggedUserRole.role === UserRole.Potrosuvac && <MenuItem
                                    onClick={() => navigate(`/users/${loggedUserRole.roleId}/transactions-history`, {state: {loggedUserId: loggedUserRole.roleId}})}>
                                    < Typography textAlign="center"> Transaction History</Typography>
                                </MenuItem>
                                }
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </>
                    }
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
}

export default Header;