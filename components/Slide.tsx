import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import { useColorScheme } from "react-native";
import Poster from "./Poster";
import Votes from "./Votes";

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark:boolean }>`
  color: ${props => props.isDark ? "#fff" : props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text<{ isDark:boolean }>`
  margin-top: 10px;
  color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)}'};
`;

const Vote = styled(Overview)`
  margin-top: 5px;
  font-size: 12px;
`;

interface SlideProps{
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({backdropPath, posterPath, originalTitle, voteAverage, overview}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={{flex: 1}}>
      <BgImg style={StyleSheet.absoluteFill} source={{uri: makeImgPath(backdropPath)}} />
      <BlurView tint={isDark ? "dark" : "light"} intensity={20} style={StyleSheet.absoluteFill}>
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            <Votes voteAverage={voteAverage} />
            <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  )
}

export default Slide;