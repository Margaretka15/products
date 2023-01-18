import React from 'react';
import Product from "./Product";
import {List} from "@mui/material";
import {IProduct} from "../interfaces/Interfaces";

type Props = {
    data: Array<IProduct>
}

function ProductsList({data}: Props) {

    return (
        <>
            <List sx={{minHeight: "350px"}}>
                {data.map((p: IProduct) => {
                    return (
                        <Product id={p.id}
                                 key={`product-${p.id}`}
                                 year={p.year}
                                 name={p.name}
                                 color={p.color}
                                 pantone_value={p.pantone_value}/>
                    )
                })}
            </List>
        </>
    );
}

export default ProductsList;