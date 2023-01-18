import React from 'react';
import {Alert} from "@mui/material";

type Props = {
    message: string;
}

const ErrorMessage = ({message}: Props) => {
    return (
        <Alert severity="error">{message}</Alert>
    );
};

export default ErrorMessage;