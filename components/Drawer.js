import React, { Component, createRef } from "react";
import styled from "styled-components/native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Animated, Text, View } from "react-native";
import FloatingLabelInput from "./FloatingLabelInput";
import colors, { toRgba } from "../styles/colors";
import { Title } from "../styles/layouts";

export default class Drawer extends Component {
  state = {
    drawAnimation: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.drawAnimation, {
      toValue: 1,
      duration: 750
    }).start();
  }

  close = () => {
    Animated.timing(this.state.drawAnimation, {
      toValue: 0,
      duration: 500
    }).start();
  };

  render() {
    const { drawAnimation } = this.state;
    const animationValue = drawAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "60%"]
    });
    const paddingValue = drawAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20]
    });

    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        close: this.close
      });
    });

    return (
      <Animated.View
        style={{
          margin: 0,
          padding: 0,
          height: animationValue,
          paddingTop: paddingValue,
          backgroundColor: `${toRgba(colors.red1, 1)}`
        }}
      >
        {children}
      </Animated.View>
    );
  }
}
