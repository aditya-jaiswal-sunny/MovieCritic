
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteMovie } from '../../api/movie';

import "./movieCard.scss"
import AddMovieDialogBox from '../../feature/addMovie/AddMovie';

const MovieCard = ({ id, name, date, rating }) => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const deleteClickHandler = async (event) => {
        event.stopPropagation();
        try {
            const response = await deleteMovie(id);
            console.log("response", response)
            window.location.reload();
        } catch (error) {
            console.log("err", error);
        }
    }

    const updateClickHandler = async (event) => {
        event.stopPropagation();
        setOpen(true);
    }

    const cardClickHandler = () => {
        navigate(`/movie/${id}/review`)
    }
    return (
        <>
            <div className='d-flex flex-column mt-5 p-3 col mx-2' id="movie-card" style={{ minWidth: "30%", maxWidth: "30%", backgroundColor: "#8B93FF", cursor: 'pointer' }}
                onClick={cardClickHandler}
            >
                <div className='d-flex flex-column'>
                    <span className='movie-name mt-2' >{name}</span>
                    <span className='released-date my-4' > Released: {date.split("T")[0]}</span>
                    <span className='rating mb-2' > Rating: {rating ? rating : 0}/10 </span>
                    <div>
                        <div style={{ float: "right", marginTop: "-20px" }}>
                            <Button sx={{ color: "white" }} onClick={updateClickHandler}><EditIcon /></Button>
                            <Button sx={{ color: "white" }} onClick={deleteClickHandler}><DeleteIcon /></Button >
                        </div>
                    </div >
                </div>
            </div >
            {open && <AddMovieDialogBox isAdd={false} open={open} handleClose={handleClose} id={id}></AddMovieDialogBox>}
        </>

    );
};

export default MovieCard