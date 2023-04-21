import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Title = styled.Text`
  color: ${props => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const VMediaView = styled.View`
  padding: 0px 20px;
  flex-direction: row;
`;

const VColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const OverView = styled.Text`
  color: ${props => props.theme.textColor};
  width: 80%;
`;

const Release = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 12px;
  margin-vertical: 10px;
`;

interface VMediaProps {
  posterPath: string | null;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const VMedia: React.FC<VMediaProps> = ({posterPath, originalTitle, overview, releaseDate, voteAverage}) => {
  return (
    <VMediaView>
      <Poster path={posterPath}></Poster>
      <VColumn>
        <Title>{originalTitle}</Title>
        {releaseDate ? (
          <Release>{new Date(releaseDate).toLocaleDateString('ko', {year: 'numeric', month: 'long', day: 'numeric'})}</Release>
        ) : (
          voteAverage ? <Votes voteAverage={voteAverage} /> : null
        )}
        <OverView>{overview !== "" && overview.length > 140 ? `${overview.slice(0, 140)}...` : overview}</OverView>
      </VColumn>
    </VMediaView>
  )
}

export default VMedia;