import React from 'react';
import { TextField } from '@mui/material';

const CustomTextArea = (props) => {
    const { searchText, placeholder, onChangeHandler } = props;

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
                placeholder={placeholder}
                multiline
                rows={5}
                value={searchText}
                onChange={(event) => onChangeHandler(event.target.value)}
            />
        </div>
    )
}

export default CustomTextArea;