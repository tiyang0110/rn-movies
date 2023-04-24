import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesAPI, tvAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Container = styled.ScrollView`

`;

const SearchBar = styled.TextInput`
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState('');
  const {isLoading: moviesLoading, data: moviesData, refetch: searchMovies} = useQuery(['searchMovies', query], moviesAPI.search, {enabled: false});
  const {isLoading: tvsLoading, data: tvsData, refetch: searchTvs} = useQuery(['searchTvs', query], tvAPI.search, {enabled: false});
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if(query === '') return;

    searchMovies();
    searchTvs();
  }

  console.log('==== data ====');
  console.log(moviesData);

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvsLoading ? <Loader /> : null}
      {moviesData ? <HList title="Movies Results" data={moviesData.results} /> : null}
      {tvsData ? <HList title="Tvs Results" data={tvsData.results} /> : null}
    </Container>
  );
}

export default Search;