import React, { Component } from "react";
import { Text, View } from "react-native";
import { BasicLayout } from "../styles/layouts";

export default class Settings extends Component {
  render() {
    return (
      <BasicLayout>
        <Text>User settings</Text>
      </BasicLayout>
    );
  }
}
