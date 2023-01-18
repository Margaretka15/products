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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ProductDetailsModal() {

    const context = useContext(SelectedIdContext);

    if (!context) return null;
    const {isShowingModal, setIsShowingModal, setSelectedId, selectedId} = context;

    const handleClose = () => {
        setIsShowingModal(false);
        setSelectedId(0);
    };

    if (isShowingModal) {

        return (<Modal
            open={isShowingModal}
            sx={style}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
               <Typography>
                   {selectedId}
               </Typography>
            </Box>
        </Modal>)
    } else return null;

}

export default ProductDetailsModal;