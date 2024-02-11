import {Button, Grid, TextField} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuthContext} from "../../configurations/AuthContext";
import {CreateVehicle, UpdateVehicle} from "../../services/vehicle-service";

const DriverVehicleForm = ({vehicle, onClose}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {loggedUserRole} = useAuthContext();
    const [formData, setFormData] = useState({
        tip: vehicle?.tip ?? "",
        registracija: vehicle?.registracija ?? "",
        vozacId: vehicle?.vozac?.id ?? loggedUserRole?.roleId
    });

    const handleChange = name => event => {
        setFormData({...formData, [name]: event.target.value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (vehicle) {
            await UpdateVehicle(vehicle.id, formData)
            navigate(location.pathname);
            onClose();

            return;
        }

        let vehicleId = await CreateVehicle(formData)
        navigate(`/vehicles/${vehicleId}`);
    }

    return (<form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    onChange={handleChange("tip")}
                    name="ime"
                    variant="outlined"
                    required
                    fullWidth
                    label="Ime"
                    value={formData.tip}
                    inputProps={{
                        minLength: 2,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={handleChange("registracija")}
                    variant="outlined"
                    required
                    fullWidth
                    label="Registracija"
                    name="registracija"
                    value={formData.registracija}
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
                    {vehicle ? "Edit" : "Create"}
                </Button>
            </Grid>
        </Grid>
    </form>)
}

export default DriverVehicleForm;