import React, {useContext} from 'react';
import {SelectedIdContext} from "../App";
import {Box, Modal, Typography} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 24,
    p: 4
};

function ProductDetailsModal() {

    const context = useContext(SelectedIdContext);

    if (!context) return null;
    const {
        isShowingModal,
        setIsShowingModal,
        setSelectedProductData,
        selectedProductData
    } = context;

    const handleClose = () => {
        setIsShowingModal(false);
        setSelectedProductData({
            id: 0,
            year: 0,
            name: "",
            color: "",
            pantone_value: ""
        });
    };

    if (isShowingModal) {

        return (<Modal
            open={isShowingModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div>
                    <Typography sx={{borderBottom: "1px grey solid"}}
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                textAlign="center">
                        {selectedProductData.name}
                    </Typography>
                    <div className="product-details__color"
                         style={{backgroundColor: selectedProductData.color}}/>
                    <Typography variant="body1">
                        product id: {selectedProductData.id}
                    </Typography>
                    <Typography variant="body1">
                        pantone value: {selectedProductData.pantone_value}
                    </Typography>
                </div>
            </Box>
        </Modal>)
    } else return null;
}

export default ProductDetailsModal;