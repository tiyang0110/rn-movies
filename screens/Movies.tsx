import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList  } from "react-native"
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import { RefreshControl } from "react-native";
import VMediaList from "../components/HMediaList";
import HMediaList from "../components/VMediaList";
import HMedia from "../components/HMedia";
import { View } from "react-native";
import VMedia from "../components/VMedia";

const API_KEY = '34dd1ee0f946af031080543a470e2f0b';

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

const keyExtractor = (item) => {
  return item.id + '';
}

const { height : SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate }}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlyaing] = useState([]);
  const [upComing, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async() => {
    const { results } = await (await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)).json();
    setTrending(results);
  }

  const getUpcoming = async() => {
    const { results } = await (await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`)).json();
    setUpcoming(results);
  };

  const getNowPlaying = async() => {
    const { results } = await (await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`)).json();
    setNowPlyaing(results);
  };

  const getData = async() => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);

    setLoading(false);
  }

  useEffect(() => {
    getData();
  },[])

  const onRefresh = async() => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
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
          {nowPlaying.map(movie => (
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
            data={trending}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={HSeparator}
            contentContainerStyle={{ paddingHorizontal: 20, marginBottom: 30 }}
            renderItem={renderHMedia}
          />
          <ListTitle>Coming soon</ListTitle>
        </>
      }
      data={upComing}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={VSeparator}
      renderItem={renderVMedia}
    />
      
      
  )
};

export default Movies;