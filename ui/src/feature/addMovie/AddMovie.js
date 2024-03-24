
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import CustomButton from '../../component/customButton/CustomButton.js';
import CustomTextBox from '../../component/customTextBox/CustomTextBox.js';
import { addMovie, getMovieById, updateMovie } from '../../api/movie.js';

import "./addMovie.scss"

function AddMovieDialogBox({ isAdd, open, handleClose, id }) {

    const [name, setName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMovieById(id);
            console.log("response", response);
            setName(response?.data?.[0].name);
            setReleaseDate(response?.data?.[0].releasedate.split("T")[0]);
        }
        !isAdd && fetchData();
    }, [])

    const submitHandler = async () => {
        try {
            setLoading(true);
            const body = {
                movie_name: name,
                release_date: releaseDate,
            }

            const response = await addMovie(body);
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
        console.log("adddd");
        try {
            setLoading(true);
            const body = {
                movie_name: name,
                release_date: releaseDate,
            }

            const response = await updateMovie(id, body);
            console.log("res", response.data);
            handleClose();
            window.location.reload();
        } catch (error) {
            console.log("err", error);
        } finally {
            setLoading(false);
        }
    }

    const title = isAdd ? "Add new movie" : "Edit movie";
    const buttonTitle = isAdd ? "create" : "edit";
    const handler = isAdd ? submitHandler : updateHandler;


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <span className='dialog-box-heading px-3'> {title}</span>
                    <div className='d-flex flex-column mt-5 px-3'>
                        <CustomTextBox
                            searchText={name}
                            onChangeHandler={setName}
                            placeholder="Your Name"></CustomTextBox>
                        <CustomTextBox
                            searchText={releaseDate}
                            onChangeHandler={setReleaseDate}
                            placeholder="Valid Release Date like (24-03-2024)"
                            type={"date"}
                        ></CustomTextBox>
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
                            id="add-movie"
                            onClickHandler={handler}
                        ></CustomButton>
                    </div>

                </DialogContent>
            </Dialog>
        </div >
    );
}

export default AddMovieDialogBox;

