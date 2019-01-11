import React, { Component, createRef } from "react";
import styled from "styled-components/native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Text } from "react-native";
import FloatingLabelInput from "./FloatingLabelInput";
import colors, { toRgba } from "../styles/colors";
import { Title } from "../styles/layouts";

import { CURRENT_USER_QUERY, USER_INFO_QUERY } from "./User";

const LoginContainer = styled.View`
  background-color: ${toRgba(colors.red1, 1)};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50;
  padding: 5px;
  border: 5px solid rgba(255, 255, 255, 0.7);
  margin-top: 25px;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
`;

const LOGIN_MUTATION = gql`
  mutation login($user: String!, $password: String!) {
    login(user: $user, password: $password) {
      bidTokens
      purchaseTokens
      user {
        id
        displayName
        permissions
        password
      }
    }
  }
`;

export default class Login extends Component {
  constructor() {
    super();
    this.userInput = createRef();
    this.passwordInput = createRef();
    this.state = {
      user: "",
      password: ""
    };
  }

  submit = async (func, data) => {
    const res = await func(data);
    if (res.data) {
      this.props.close();
      // SET USER AS CURRENTUSER
    }
  };

  render() {
    const { user, password } = this.state;

    return (
      <LoginContainer>
        <Title style={{ textDecorationLine: "underline" }}>Kirjaudu</Title>
        <Mutation
          mutation={LOGIN_MUTATION}
          refetchQueries={[{ query: USER_INFO_QUERY }]}
        >
          {(login, { loading, error }) =>
            loading ? (
              <Text>Hey</Text>
            ) : (
              <>
                <FloatingLabelInput
                  ref={this.userInput}
                  label="Email/Käyttäjätunnus"
                  onChangeText={user => this.setState({ user })}
                  value={user}
                  autoFocus={true}
                  keyboardAppearance="dark"
                  keyboardType="email-address"
                  onSubmitEditing={() => this.passwordInput.focus()}
                />
                <FloatingLabelInput
                  inputRef={ref => (this.passwordInput = ref)}
                  label="Salasana"
                  onChangeText={password => this.setState({ password })}
                  value={password}
                  keyboardAppearance="dark"
                  keyboardType="email-address"
                  onSubmitEditing={() =>
                    this.submit(login, { variables: this.state })
                  }
                />
                {error && <Title>{error.message}</Title>}
              </>
            )
          }
        </Mutation>
      </LoginContainer>
    );
  }
}
