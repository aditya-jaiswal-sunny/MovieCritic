import React, { useEffect, useState } from 'react';
import "./movie.scss"
import SearchBox from '../../component/searchBox/SearchBox';
import MovieCard from '../../component/movieCard/MovieCard';
import { getMovieList } from '../../api/movie.js';

function Movie(props) {

    const [movieData, setMovieData] = useState([]);
    const [search, setSearch] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            const response = await getMovieList();
            setMovieData(response.data);
        }
        fetchData();
    }, [])

    const filteredData = movieData.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <div id="movie" className='d-flex flex-column mx-5'>
                <span className='main-heading mt-4 px-3'>The best movie review site!</span>

                <div className='mt-3 px-3'>
                    <SearchBox
                        searchText={search}
                        onChangeHandler={setSearch}
                    ></SearchBox>
                </div>
            </div>

            <div className='mx-5 row'>
                {
                    filteredData.map((data) => {
                        return (
                            <MovieCard id={data.id} name={data.name} date={data.releasedate} rating={data.rating}></MovieCard>
                        )
                    })
                }
            </div >
        </>
    );
}

export default Movie;