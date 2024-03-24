import React, { useState } from 'react';
import CustomButton from '../customButton/CustomButton';
import AddMovieDialogBox from '../../feature/addMovie/AddMovie';
import AddReviewDialogBox from '../../feature/addReview/AddReview';

function Header(props) {

    const [openMovie, setOpenMovie] = useState(false);
    const [openReview, setOpenReview] = useState(false);


    const handleClickOpenMovie = () => {
        setOpenMovie(true);
    };

    const handleCloseMovie = () => {
        setOpenMovie(false);
    };

    const handleClickOpenReview = () => {
        setOpenReview(true);
    };

    const handleCloseReview = () => {
        setOpenReview(false);
    };

    return (
        <>
            <div className='d-flex justify-content-between bg-body-secondary'>
                <div className='py-3 px-5 align-self-center'>
                    <sapn>MOVIECRITIC</sapn>
                </div>
                <div className='py-3 px-5'>
                    <CustomButton
                        type="default"
                        variant="outlined"
                        id="add-new-movie"
                        customStyle={{ marginRight: '10px' }}
                        onClickHandler={handleClickOpenMovie}
                        title="Add new movie">
                    </CustomButton>
                    <CustomButton type="default"
                        variant="contained"
                        id="add-new-review"
                        onClickHandler={handleClickOpenReview}
                        title="Add new review">
                    </CustomButton>
                </div>
            </div>
            <AddMovieDialogBox isAdd={true} open={openMovie} handleClose={handleCloseMovie}></AddMovieDialogBox>
            <AddReviewDialogBox isAdd={true} open={openReview} handleClose={handleCloseReview}></AddReviewDialogBox>
        </>
    );
}

export default Header;