import React, { Component } from "react";
import { Animated, Easing, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components";
import Events from "../components/Event";
import Header from "../components/Header";
import { ScrollLayout, Title } from "../styles/layouts";



const LogoContainer = Animated.createAnimatedComponent(styled.View`
  background-color: black;
  width: 200;
  border-radius: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px;
  margin-bottom: 0px;
  border: 3px solid rgba(255, 255, 255, 0.75);
  color: white;
`);
const Logo = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Body = styled.View`
  margin-top: 35px;
  display: flex;
  border-radius: 25;
  font-size: 20;
  color: white;
  flex-direction: column;
`;

export default class Home extends Component {
  state = {
    spinValue: new Animated.Value(0),
    opacity: new Animated.Value(0),
    counter: 0
  };

  static navigationOptions = {
    title: "Huutis"
  };

  async componentDidMount() {
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bezier(0.21, 0.79, 0.52, 1.15)
    }).start();
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bezier(0.21, 0.79, 0.52, 1.15)
    }).start();
  }

  render() {
    const { toggleDrawer, showDrawer } = this.props.screenProps;
    const { spinValue, opacity } = this.state;
    const { navigate } = this.props.navigation;

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "1070deg"]
    });

    return (
      <View style={{ height: "100%" }}>
        <ScrollLayout>
          <Header toggleDrawer={toggleDrawer} />
          <Logo>
            <TouchableWithoutFeedback
              onPress={() => {
                if (showDrawer) {
                  toggleDrawer(undefined, true);
                }
              }}
            >
              <LogoContainer style={{ opacity, transform: [{ rotate: spin }] }}>
                <Title big style={{ fontFamily: "lobster" }}>
                  Huutis!
                </Title>
              </LogoContainer>
            </TouchableWithoutFeedback>
          </Logo>
          <Body>
            <Events />
          </Body>
          {/* <View style={{ flex: 4, height: "100%", paddingTop: 50 }}>
          <LinearGradient
            colors={[
              toRgba(colors.red2, 1),
              toRgba(colors.red1, 0.5),
              "rgba(255,255,255,0)"
            ]}
            style={{
              width: "100%",
              height: "20%",
              position: "absolute",
              zIndex: 9999
            }}
          />
          
        </View> */}
        </ScrollLayout>
      </View>
    );
  }
}
