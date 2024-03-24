
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteReview } from '../../api/review';

import "./reviewCard.scss"
import AddReviewDialogBox from '../../feature/addReview/AddReview';

function ReviewCard({ id, name, rating, comment }) {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const deleteClickHandler = async () => {
        try {
            const response = await deleteReview(id);
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

    return (
        <>
            <div className='p-3 mt-3 d-flex flex-column border border-4' id='review-card'>
                <div className='d-flex flex-row justify-content-between align-items-between px-4'>
                    <span className='review-comment'>{comment}</span>
                    <span className='review-rating'>{rating}/10</span>
                </div>
                <div className='d-flex flex-row justify-content-between mt-3'>
                    <span className='px-4 review-by'>By {name}</span>
                    <div>
                        <div style={{ float: "right" }}>
                            <Button sx={{ color: "grey" }} onClick={updateClickHandler}><EditIcon /></Button>
                            <Button sx={{ color: "grey" }} onClick={deleteClickHandler}><DeleteIcon /></Button >
                        </div>
                    </div>
                </div>

            </div>
            <AddReviewDialogBox isAdd={false} open={open} handleClose={handleClose} id={id}></AddReviewDialogBox>
        </>
    );
}

export default ReviewCard;