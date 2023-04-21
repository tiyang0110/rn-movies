import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {isLoading: todayLoading, data: todayData} = useQuery(['tv', 'today'], tvAPI.airingToday);
  const {isLoading: topLoading, data: topData} = useQuery(['tv', 'top'], tvAPI.topRated);
  const {isLoading: trendingLoading, data: trendingData} = useQuery(['tv', 'trending'], tvAPI.trending);

  const onRefresh = async() => {
    setRefreshing(true);
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false);
  }

  const loading = todayLoading || topLoading || trendingLoading;

  if(loading) return <Loader />;
  
  return (
    <ScrollView
      contentContainerStyle={{paddingVertical: 30}}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing TV" data={todayData.results} />
      <HList title="TopRated TV" data={topData.results} />
    </ScrollView>
  );
}

export default Tv;