import {Button, Grid, MenuItem, Select, TextField} from "@mui/material";
import {useLoaderData, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {CreateRestorant, UpdateRestorant} from "../../services/restoran-service";
import {UserRole} from "../../services/user-service";

const RestorantForm = ({restorant, onClose}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {inactiveMenagers} = useLoaderData();
    const [error, setError] = useState(false);

    const {loggedUserRole} = useAuthContext();
    const [formData, setFormData] = useState({
        ime: restorant?.ime ?? "",
        lokacija: restorant?.lokacija ?? "",
        rabotnoVreme: restorant?.rabotnoVreme ?? "",
        managerId: restorant?.manager.id ??
        loggedUserRole?.role === UserRole.Menager
            ? loggedUserRole.roleId
            : 0
    });

    const handleChange = name => event => {
        setFormData({...formData, [name]: event.target.value});

        if (name === "managerId" && event.target.value === 0) {
            setError(true);
            return;
        }

        setError(false)
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (formData.managerId === 0) {
            setError(true);

            return;
        }

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
            {!restorant && <Grid item xs={12}>
                <Select
                    value={formData.managerId}
                    onChange={handleChange("managerId")}
                    displayEmpty
                    fullWidth
                    labelId="demo-simple-select-error-label"
                    id="demo-simple-select-error"
                    error={error && formData.managerId === 0}
                >
                    <MenuItem value={0}>
                        <em>None</em>
                    </MenuItem>
                    {inactiveMenagers && inactiveMenagers.length > 0 &&
                        inactiveMenagers.map(manager =>
                            <MenuItem key={manager.id}
                                      value={manager.id}>{manager.korisnik.username}</MenuItem>)
                    }
                </Select>
            </Grid>}
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