import React, {useContext} from 'react';
import {SelectedIdContext} from "../App";
import {Box, Modal, Typography} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function ProductDetails() {

    const context = useContext(SelectedIdContext);

    const handleClose = () => {
        context?.setIsShowingModal(false);
        context?.setSelectedId(0);
    };

    if (context?.isShowingModal) {
        // return (
        //     <div>{context?.selectedId}
        //         <div onClick={handleClick}>close</div>
        //     </div>);
        return (<Modal
            open={context.isShowingModal}
            sx={style}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
               <Typography>
                   {context?.selectedId}
               </Typography>
            </Box>
        </Modal>)
    } else return null;

}

export default ProductDetails;