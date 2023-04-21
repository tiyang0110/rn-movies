import React from "react"
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const HMediaView = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: ${props => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface HMediaProp {
  posterPath: string | null;
  originalTitle: string;
  voteAverage: number;
}

const HMedia: React.FC<HMediaProp> = ({posterPath, originalTitle, voteAverage}) => {
  return (
    <HMediaView>
      <Poster path={posterPath}></Poster>
      <Title>
        {originalTitle.slice(0,12)}
        {originalTitle.length > 12 ? '...' : null}
      </Title>
      <Votes voteAverage={voteAverage} />
    </HMediaView>
  )
}

export default HMedia;