import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import styled from "styled-components";
import { SecureStore } from "expo";
import User from "./User";
import Login from "./Login";
import Register from "./Register";

const HeaderContainer = styled.View`
  margin-top: 20;
  background-color: rgba(255, 255, 255, 0.8);
  width: 100;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: flex-end;
  align-self: flex-end;
`;

export default class Header extends Component {
  // Logout the user from the application.
  removeToken = () => {
    SecureStore.deleteItemAsync("huutis_token");
  };

  handlePress = msg => {
    switch (msg) {
      case "LOGINZ": {
        this.props.toggleDrawer(<Login />);
        break; // wow
      }
      case "REGISTER": {
        this.props.toggleDrawer(<Register />);
        break;
      }
    }
  };

  render() {
    return (
      <HeaderContainer>
        <User>
          {({ user, client }) => {
            if (user) {
              return (
                <>
                  <Text>{user.displayName}</Text>
                  <Text>Huudot: {user.bidTokens}</Text>
                  <Text>Ostoja: {user.purchaseTokens}</Text>
                  <Button
                    title="logout"
                    onPress={() => {
                      this.removeToken(client);
                      client.resetStore();
                    }}
                  />
                </>
              );
            } else {
              return (
                <View>
                  <Button
                    title="loginz"
                    onPress={e => this.handlePress("LOGINZ")}
                  />
                  <Button
                    title="register"
                    onPress={e => this.handlePress("REGISTER")}
                  />
                </View>
              );
            }
          }}
        </User>
      </HeaderContainer>
    );
  }
}
