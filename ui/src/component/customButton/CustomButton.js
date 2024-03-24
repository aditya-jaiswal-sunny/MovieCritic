import React from 'react';

//mui components
import { Button } from '@mui/material';

const CustomButton = (props) => {
    const {
        disabled,
        title,
        onClickHandler,
        variant,
        type,
        customStyle,
        id
    } = props;

    return (
        <Button
            id={id}
            variant={variant}
            type={type}
            sx={{ ...customStyle }}
            onClick={(event) => onClickHandler(event)}
            disabled={disabled}
        >
            {title}
        </Button>
    );
};

export default CustomButton;
