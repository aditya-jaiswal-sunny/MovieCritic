import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = (props) => {
    const { searchText, onChangeHandler } = props;

    return (
        <div>
            <TextField
                sx={{
                    width: 450,
                    background: "white",
                    borderRadius: "3.125rem",
                    border: "none"
                }}
                placeholder="Search for your favourite movie"
                value={searchText}
                onChange={(event) => onChangeHandler(event.target?.value)}
                InputProps={{
                    startAdornment:
                        <InputAdornment position="start">
                            <SearchIcon
                                sx={{
                                    width: 20,
                                    height: 20,
                                    marginRight: '0.5rem',
                                }}
                            />
                        </InputAdornment>
                }}
            />
        </div>
    )
}

export default SearchBox;