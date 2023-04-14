import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";

const Vote = styled.Text<{ isDark: boolean }>`
  color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)}'};
  font-size: 12px;
`;

interface VotesProps {
  voteAverage: number;
}

const Votes: React.FC<VotesProps> = ({voteAverage}) => {
  const isDark = useColorScheme() === "dark";

  return <Vote isDark={isDark}>⭐️{voteAverage}/10</Vote>;
}

export default Votes;