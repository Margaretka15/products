import React, {useContext} from 'react';
import {IProduct} from "./ProductsList";
import {SelectedIdContext} from "../App";

function Product(product: IProduct) {
    const context = useContext(SelectedIdContext);

    const {id, name, year, color, pantone_value: pantoneValue} = product;
    return (
        <div style={{backgroundColor: color}} onClick={() => {
            if (!context?.isShowingModal) {
                context?.setSelectedId(id);
                context?.setIsShowingModal(() => true);
            }
        }}>
            {name}
            {year}
            {pantoneValue}

        </div>
    );
}
export default Product;