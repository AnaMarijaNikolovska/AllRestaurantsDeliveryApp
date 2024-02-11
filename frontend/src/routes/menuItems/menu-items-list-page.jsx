import {Grid} from "@mui/material";
import {useLoaderData} from "react-router-dom";
import MenuItemCard from "../../components/cards/menu-item-card";

const MenuItemsListPage = () => {
    const loaderData = useLoaderData();
    console.log(loaderData);
    return (
        <Grid container>
            {loaderData.menuItems &&
                loaderData.menuItems.length > 0 &&
                loaderData.menuItems.map((menuItem) => (
                    <Grid key={menuItem.id} item xs={12} md={6} lg={4}>
                        <MenuItemCard item={menuItem}/>
                    </Grid>
                ))}
        </Grid>
    )
}
export default MenuItemsListPage;
