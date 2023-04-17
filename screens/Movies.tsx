import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList  } from "react-native"
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useQuery } from "react-query";
import { moviesAPI } from "../api";



const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const HSeparator = styled.View`
  width: 20px;
`;

const VSeparator = styled.View`
  height: 20px;
`;

const { height : SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate }}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {isLoading: nowPlayingLoading, data: nowPlayingData} = useQuery("nowPlaying", moviesAPI.nowPlaying);
  const {isLoading: upComingLoading, data: upComingData} = useQuery("upComing", moviesAPI.upComing);
  const {isLoading: trendingLoading, data: trendingData} = useQuery("trending", moviesAPI.trending);

  const onRefresh = async() => {
    
  }

  const renderVMedia = ({item}) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia = ({item}) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const keyExtractor = (item) => item.id + '';

  const loading = nowPlayingLoading || upComingLoading || trendingLoading;

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader> 
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper horizontal loop autoplay autoplayTimeout={3.5} showsPagination={false} showsButtons={false} containerStyle={{marginBottom: 30, width: "100%", height: SCREEN_HEIGHT / 4}}>
          {nowPlayingData.results.map(movie => (
            <Slide key={movie.id}
              backdropPath={movie.backdrop_path}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
              overview={movie.overview}
            />
          ))}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>
          <FlatList
            horizontal
            data={trendingData.results}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={HSeparator}
            contentContainerStyle={{ paddingHorizontal: 20, marginBottom: 30 }}
            renderItem={renderHMedia}
          />
          <ListTitle>Coming soon</ListTitle>
        </>
      }
      data={upComingData.results}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={VSeparator}
      renderItem={renderVMedia}
    />
      
      
  )
};

export default Movies;