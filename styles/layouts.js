import styled, { injectGlobal } from "styled-components/native";
import { Dimensions } from "react-native";
import colors, { toRgba } from "./colors";

const height = Dimensions.get("window").height;

export const ScrollLayout = styled.ScrollView`
  background-color: ${colors.red2};
  height: ${height};
  display: flex;
  flex-direction: column;
`;

export const Title = styled.Text`
  font-family: lobster;
  padding: 10px;
  font-size: ${props => (props.big ? 50 : 30)};
  color: white;
`;

export const BasicInput = styled.TextInput`
  text-align: center;
  width: 90%;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 25;
  padding: 10px;
  border-radius: 10;
  border: 1px solid rgba(255, 255, 255, ${props => (props.isFocused ? 1 : 0.4)});
`;
