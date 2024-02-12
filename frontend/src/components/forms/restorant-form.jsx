import {Button, Container, Grid, TextField} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {CreateRestorant, UpdateRestorant} from "../../services/restoran-service";

const RestorantForm = ({restorant, onClose}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {loggedUserRole} = useAuthContext();
    const [formData, setFormData] = useState({
        ime: restorant?.ime ?? "",
        lokacija: restorant?.lokacija ?? "",
        rabotnoVreme: restorant?.rabotnoVreme ?? "",
        managerId: restorant?.manager.id ?? loggedUserRole?.roleId
    });

    const handleChange = name => event => {
        setFormData({...formData, [name]: event.target.value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (restorant) {
            await UpdateRestorant(restorant.id, formData)
            navigate(location.pathname);
            onClose();

            return;
        }

        let restorantId = await CreateRestorant(formData);

        if (restorantId) {
            navigate(`/restorants/${restorantId}`);
        }
    }

    return (<form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
                <TextField
                    onChange={handleChange("lokacija")}
                    variant="outlined"
                    required
                    fullWidth
                    label="Lokacija"
                    name="lokacija"
                    value={formData.lokacija}
                    inputProps={{
                        minLength: 2,
                    }}
                />
            </Grid>
            <Grid item xs={12}>

                <TextField
                    onChange={handleChange("rabotnoVreme")}
                    variant="outlined"
                    required
                    fullWidth
                    label="Rabotno vreme vo format OD - DO"
                    value={formData.rabotnoVreme}
                    name="rabotnoVreme"
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
                    {restorant ? "Edit" : "Create"}
                </Button>
            </Grid>
        </Grid>
    </form>)
}

export default RestorantForm;