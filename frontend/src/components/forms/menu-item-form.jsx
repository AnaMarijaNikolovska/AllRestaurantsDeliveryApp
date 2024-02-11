import {Button, Grid, TextField} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {CreateMenuItem, UpdateMenuItem} from "../../services/menu-item-service";

const MenuItemForm = ({menuItem, restorantId = undefined, onClose}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        ime: menuItem?.ime ?? "",
        cena: menuItem?.cena ?? 0,
        restorantId: restorantId
    });

    const handleChange = name => event => {
        setFormData({...formData, [name]: event.target.value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (menuItem) {
            await UpdateMenuItem(menuItem.id, formData)
            navigate(location.pathname);
            onClose();

            return;
        }

        await CreateMenuItem(formData)
        onClose();
        navigate(location.pathname);
    }

    return (<form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    onChange={handleChange("ime")}
                    name="ime"
                    variant="outlined"
                    required
                    fullWidth
                    label="Ime"
                    value={formData.ime}
                    inputProps={{
                        minLength: 2,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    onChange={handleChange("cena")}
                    variant="outlined"
                    required
                    fullWidth
                    label="Cena"
                    type="number"
                    name="cena"
                    value={formData.cena}
                    inputProps={{
                        minLength: 2,
                    }}
                />
            </Grid>
            <Grid item>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    {menuItem ? "Edit" : "Create"}
                </Button>
            </Grid>
        </Grid>
    </form>)
}

export default MenuItemForm;