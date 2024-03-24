/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';


const DropDown = (props) => {
    const {
        label,
        title,
        onChangeHandler,
        value,
        options,
        customStyle,
        customSx,
        index,
    } = props;

    const SelectStyle = useMemo(() => {
        return styled(Select)({
            '.Mui-disabled': {
                'WebkitTextFillColor': 'black!important',
                color: 'black',
                borderWidth: 1,
            },
        });
    });

    return (
        <>
            <FormControl
                sx={customStyle}
            >
                <InputLabel >{title}</InputLabel>
                <SelectStyle
                    value={value ? value : ''}
                    label={label}
                    onChange={onChangeHandler}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                maxHeight: '30% ',
                                maxWidth: '8%',
                            },
                        },
                    }}
                    sx={{
                        '& .MuiSelect-iconOutlined': {
                            display: customSx ? 'none' : '',
                        },
                        color: customStyle?.color,
                        textAlign: "left"
                    }}
                >
                    {
                        options.map((option, optionIndex) => (
                            <MenuItem
                                key={optionIndex}
                                value={option}
                                style={{ whiteSpace: 'normal' }}
                                sx={{
                                    '&.MuiSelected': {
                                        borderBottom: 'none',
                                    },
                                }}
                            >
                                {option.value}
                            </MenuItem>
                        ))
                    }
                </SelectStyle>
            </FormControl>
        </>
    );
};

export default DropDown;
