import RestorantForm from "../../components/forms/restorant-form";
import {Container, Typography} from "@mui/material";

const RestorantCreate = () => {
    return (
        <div>
            <Container component="main" maxWidth="xs" className="register-container-custom">
                <Typography variant={"h1"} className={"mt-5 mb-3"}>Create Restorant</Typography>
                <RestorantForm/>
            </Container>
        </div>
    )
}

export default RestorantCreate;