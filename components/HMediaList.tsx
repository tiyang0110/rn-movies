import React from "react";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import HMedia from "./HMedia";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

interface HMediaListProps {
  title: string;
  mediaList: {
    id: string;
    poster_path: string;
    original_title: string;
    vote_average: number;
  }[];
}

const HMediaList: React.FC<HMediaListProps> = ({title, mediaList}) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList 
        data={mediaList}
        horizontal
        keyExtractor={(item) => item.id+''}
        ItemSeparatorComponent={() => <View style={{width: 20}} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({item}) => <HMedia posterPath={item.poster_path} originalTitle={item.original_title}  voteAverage={item.vote_average}/>}
      />
    </ListContainer>
  );
}

export default HMediaList;