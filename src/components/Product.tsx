import React, {useContext} from 'react';
import {SelectedIdContext} from "../App";
import {ListItem, ListItemText} from "@mui/material";
import {IProduct} from "../interfaces/Interfaces";


function Product(product: IProduct) {
    const context = useContext(SelectedIdContext);

    const {id, name, year, color, pantone_value: pantoneValue} = product;

    const listItemStyle =
        [{
            backgroundColor: color,
            transition: 'all .2s',
            marginBottom: '8px',
            borderRadius: '4px',
            // boxShadow: 1
        },
            {
                '&:hover':
                    {
                        backgroundColor: `${color}90`,
                        cursor: 'pointer',
                        transform: 'translateY(-1px)'
                    }
            }
        ]

    const handleClick = () => {
        if (!context?.isShowingModal) {
            context?.setSelectedId(id);
            context?.setIsShowingModal(() => true);
        }
    }
    return (
        <ListItem sx={listItemStyle} onClick={handleClick}>
            <ListItemText primary={name}
                          secondary={`${year} ${pantoneValue}`}/>
        </ListItem>
    );
}

export default Product;