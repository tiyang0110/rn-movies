import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import HMedia from "./HMedia";
import { Movie, Tv } from "../api";

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

export const HSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: Movie[] | Tv[];
}

const HList: React.FC<HListProps> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList 
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: Movie | Tv) => item.id + ''}
        contentContainerStyle={{paddingHorizontal: 20}}
        ItemSeparatorComponent={HSeparator}
        renderItem={({item}: { item: Movie | Tv}) => (
          <HMedia 
            posterPath={item.poster_path}
            originalTitle={
              "original_title" in item ? item.original_title : item.original_name
            }
            voteAverage={item.vote_average}
          />
        )}
      />
    </ListContainer>
  );
}

export default HList;