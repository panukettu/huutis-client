import React, { Component } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Animated } from "react-native";

import { BasicInput } from "../styles/layouts";

const Label = Animated.createAnimatedComponent(styled.Text`
  position: absolute;
  left: 0;
  font-family: lobster;
  width: 100%;
  text-align: center;
  line-height: 22;
`);

export default class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
    animate: new Animated.Value(0)
  };

  componentDidUpdate = (prevProps, prevState) => {
    Animated.timing(this.state.animate, {
      toValue: this.state.isFocused ? 1 : 0,
      duration: 200
    }).start();
  };

  handleFocus = () => this.setState({ isFocused: true });

  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { label } = this.props;
    const labelStyle = {
      top: this.state.animate.interpolate({
        inputRange: [0, 1],
        outputRange: [40, 0]
      }),
      fontSize: this.state.animate.interpolate({
        inputRange: [0, 1],
        outputRange: [22, 18]
      }),
      color: this.state.animate.interpolate({
        inputRange: [0, 1],
        outputRange: ["grey", "white"]
      })
    };

    return (
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          paddingTop: 25,
          marginBottom: 10
        }}
      >
        <Label style={labelStyle}>{label}</Label>
        <BasicInput
          ref={this.props.inputRef}
          onFocus={() => this.handleFocus()}
          onBlur={() => this.handleBlur()}
          {...this.props}
          isFocused={this.state.isFocused}
        />
      </View>
    );
  }
}
