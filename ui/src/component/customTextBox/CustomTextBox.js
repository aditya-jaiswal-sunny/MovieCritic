import React from 'react';
import { TextField } from '@mui/material';

const CustomTextBox = (props) => {
    const { searchText, placeholder, onChangeHandler, type } = props;

    return (
        <div>
            <TextField
                sx={{
                    width: 450,
                    background: "white",
                    borderRadius: "3.125rem",
                    border: "none",
                    marginTop: 2
                }}
                type={type}
                placeholder={placeholder}
                value={searchText}
                onChange={(event) => onChangeHandler(event.target?.value)}
            />
        </div>
    )
}

export default CustomTextBox;