import { useState } from 'react';
import './App.css';
import axios from "axios";
import styled from "styled-components";
import MovieComponent from './components/MovieComponent';
import MovieDetailsComponent from './components/MovieDetailsComponent';

export const API_KEY = "9f102651";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  color: Blue;
  align-items: center;
  padding: 10px;
  font-size: 25x;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
font-weight: bold;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  width: 48px;
  height: 38px;
  margin: 15px;
  border-radius: 6px;
  margin-centre: 20px;
  width: 50%;
  background-color: white;
align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
color: black;
font-size: 20px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    console.log(response.data.Search);
    updateMovieList(response.data.Search);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.svg" />
          Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie Name"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {
      selectedMovie && 
      <MovieDetailsComponent 
        selectedMovie={selectedMovie}
        onMovieSelect={onMovieSelect} 
      />}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect ={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/movie-icon.svg"/>

        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
