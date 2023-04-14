import React from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import HMedia from "./VMedia";



interface VMediaListProps {
  title: string;
  mediaList: {
    id: string;
    poster_path: string;
    original_title: string;
    release_date?: string;
    vote_average?: number;
    overview: string;
  }[];
}

const VMediaList: React.FC<VMediaListProps> = ({title, mediaList}) => {
  return (
    <View>
      <FlatList
        data={mediaList}
        keyExtractor={(item) => item.id+''}
        ItemSeparatorComponent={() => <View style={{maxHeight: 20}} />}
        renderItem={({item}) => (
          <HMedia 
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            voteAverage={item.vote_average}
          />
        )}
      />
    </View>
  );
}

export default VMediaList;