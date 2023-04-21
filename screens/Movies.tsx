import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Dimensions, FlatList  } from "react-native"
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import { useQuery, useQueryClient } from "react-query";
import { Movie, MovieResponse, moviesAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const ListTitle = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  height: 20px;
`;

const { height : SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate }}) => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {isLoading: nowPlayingLoading, data: nowPlayingData} = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  const {isLoading: upComingLoading, data: upComingData} = useQuery<MovieResponse>(["movies", "upComing"], moviesAPI.upComing);
  const {isLoading: trendingLoading, data: trendingData} = useQuery<MovieResponse>(["movies", "trending"], moviesAPI.trending);

  const onRefresh = async() => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const keyExtractor = (item: Movie) => item.id + '';

  const loading = nowPlayingLoading || upComingLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : (
    upComingData ? <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper horizontal loop autoplay autoplayTimeout={3.5} showsPagination={false} showsButtons={false} containerStyle={{marginBottom: 30, width: "100%", height: SCREEN_HEIGHT / 4}}>
          {nowPlayingData?.results.map(movie => (
            <Slide key={movie.id}
              backdropPath={movie.backdrop_path || ""}
              posterPath={movie.poster_path || ""}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
              overview={movie.overview}
            />
          ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          <ListTitle>Coming soon</ListTitle>
        </>
      }
      data={upComingData.results}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={VSeparator}
      renderItem={({item}) => (
        <VMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
          voteAverage={item.vote_average}
        />
      )}
    /> : null
  );
};

export default Movies;