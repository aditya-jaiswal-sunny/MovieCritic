
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import CustomButton from '../../component/customButton/CustomButton.js';
import CustomTextBox from '../../component/customTextBox/CustomTextBox.js';
import CustomTextArea from '../../component/customTextArea/CustomTextArea.js';
import CustomDropDown from '../../component/customDropdown/CustomDropDown.js';
import { getMovieList } from '../../api/movie.js';
import { addReview, getReviewById, updateReview } from '../../api/review.js';
import "./addReview.scss";

function AddReviewDialogBox({ isAdd, open, handleClose, id }) {
    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        try {
            setLoading(true)
            const fetchData = async () => {
                const response = await getMovieList();
                const movieList = response.data.map((data) => ({
                    id: data.id,
                    value: data.name
                }));
                setMovieList(movieList);
            }
            const fetchReviewData = async () => {
                const response = await getReviewById(id);
                const selectMovie = movieList.filter((data) => data.id == response.data?.[0].movieid)

                setSelectedMovie(selectMovie[0]);
                setName(response.data?.[0]?.name);
                setRating(response.data?.[0]?.rating);
                setComment(response.data?.[0]?.comment);
            }
            fetchData();
            !isAdd && fetchReviewData();
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [])

    console.log("selectedMovie", selectedMovie);

    const onChangeHandler = (event) => {
        setSelectedMovie(event.target.value)
    }

    const submitHandler = async () => {
        try {
            setLoading(true);
            const body = {
                movie_id: selectedMovie.id,
                reviewer_name: name,
                reviewer_rating: rating,
                reviewer_comment: comment
            }

            const response = await addReview(body);
            console.log("res", response.data);
            handleClose();
            window.location.reload();
        } catch (error) {
            console.log("err", error);
        } finally {
            setLoading(false);
        }
    }

    const updateHandler = async () => {
        try {
            setLoading(true);
            const body = {
                movie_id: selectedMovie.id,
                reviewer_name: name,
                reviewer_rating: rating,
                reviewer_comment: comment
            }
            const response = await updateReview(id, body);
            console.log("res", response.data);
            handleClose();
            window.location.reload();
        } catch (error) {
            console.log("err", error);
        } finally {
            setLoading(false);
        }
    }

    const title = isAdd ? "Add new review" : "Edit review";
    const buttonTitle = isAdd ? "create" : "edit";
    const handler = isAdd ? submitHandler : updateHandler;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogContent>
                <span className='dialog-box-heading px-3'>{title}</span>
                <div className='d-flex flex-column mt-5 px-3'>
                    <CustomDropDown
                        title="Select Movie"
                        label="Select Movie"
                        value={selectedMovie}
                        options={movieList}
                        onChangeHandler={onChangeHandler}
                    ></CustomDropDown>
                    <CustomTextBox
                        searchText={name}
                        onChangeHandler={setName}
                        placeholder="Your Name"></CustomTextBox>
                    <CustomTextBox
                        searchText={rating}
                        onChangeHandler={setRating}
                        placeholder="Rating out of 10"></CustomTextBox>
                    <CustomTextArea
                        searchText={comment}
                        onChangeHandler={setComment}
                        placeholder="Reviews Comments"></CustomTextArea>
                </div>
                <div className='d-flex flex-row justify-content-between mt-5 px-3'>
                    <CustomButton
                        title="close"
                        onClickHandler={handleClose}
                        variant="outlined"
                    ></CustomButton>
                    <CustomButton
                        title={buttonTitle}
                        variant="contained"
                        id="add-review"
                        onClickHandler={handler}
                    ></CustomButton>
                </div>

            </DialogContent>
        </Dialog>
    );
}

export default AddReviewDialogBox;

