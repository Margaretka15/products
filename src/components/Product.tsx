import React, {useContext} from 'react';
import {IProduct} from "./ProductsList";
import {SelectedIdContext} from "../App";
import {ListItem, ListItemText} from "@mui/material";

function Product(product: IProduct) {
    const context = useContext(SelectedIdContext);

    const {id, name, year, color, pantone_value: pantoneValue} = product;
    const handleClick = () => {
        if (!context?.isShowingModal) {
            context?.setSelectedId(id);
            context?.setIsShowingModal(() => true);
        }
    }
    return (

        <ListItem sx={{backgroundColor: color}} onClick={handleClick}>
            <ListItemText primary={name}
            secondary={`${year} ${pantoneValue}`}/>
        </ListItem>
    );
}

export default Product;