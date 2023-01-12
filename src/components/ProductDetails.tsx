import React, {useContext} from 'react';
import {SelectedIdContext} from "../App";

function ProductDetails() {
    const context = useContext(SelectedIdContext);

    if (context?.isShowingModal) {
        return (
            <div>{context?.selectedId}
                <div onClick={() => context?.setIsShowingModal(false)}>close</div>
            </div>);
    } else return null;

}

export default ProductDetails;