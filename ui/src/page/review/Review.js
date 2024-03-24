import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { getReviewByMovieId } from '../../api/review';
import ReviewCard from '../../component/reviewCard/ReviewCard.js';
import { getMovieById } from '../../api/movie.js';

import "./review.scss"

function Review(props) {

    const id = useParams().id;
    const [reviewList, setReviewList] = useState([]);
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        Promise.all([getReviewByMovieId(id), getMovieById(id)]).then(([reviewResponse, movieResponse]) => {
            setReviewList(reviewResponse.data);
            setMovieList(movieResponse.data);
        }).catch(error => {
            console.log("error", error);
        })
    }, [])

    console.log("movieList", movieList);
    console.log("reviewList", reviewList);

    return (
        <>
            <div className='d-flex flex-row justify-content-between m-5' id="review">
                <div className='movie-heading'>{movieList?.[0]?.name}</div>
                <div className='rating-heading'>{movieList?.[0]?.rating || 0}/10</div>

            </div>
            <div className='d-flex flex-column m-5'>
                {
                    reviewList?.map((data) => {
                        return (
                            <ReviewCard id={data.id} name={data.name} comment={data.comment} rating={data.rating}></ReviewCard>
                        )
                    })
                }


            </div>
        </>
    );
}

export default Review;