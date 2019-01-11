import React, { Component, createRef } from "react";
import styled from "styled-components/native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { Title } from "../styles/layouts";
import FloatingLabelInput from "./FloatingLabelInput";
import colors, { toRgba } from "../styles/colors";

import { USER_INFO_QUERY } from "./User";

const RegisterContainer = styled.View`
  background-color: ${toRgba(colors.red1, 1)};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const RegisterButton = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50;
  padding: 5px;
  border: 5px solid rgba(255, 255, 255, 0.7);
  margin-top: 25px;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
`;

const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION(
    $email: String!
    $displayName: String!
    $password: String!
  ) {
    register(email: $email, displayName: $displayName, password: $password) {
      id
      email
      displayName
    }
  }
`;
export default class Register extends Component {
  constructor() {
    super();
    this.emailInput = createRef();
    this.displayNameInput = createRef();
    this.passwordInput = createRef();
    this.state = {
      email: "esa@p.com" + Math.floor(Math.random() * 1000),
      displayName: "cooldude" + Math.floor(Math.random() * 1000),
      password: "goddamn"
    };
  }

  render() {
    const { email, displayName, password } = this.state;
    const disableSubmit = !email || !displayName || !password;

    return (
      <Mutation
        mutation={REGISTER_MUTATION}
        refetchQueries={[{ query: USER_INFO_QUERY }]}
      >
        {(register, { error, loading }) => {
          return (
            <RegisterContainer>
              <Title style={{ textDecorationLine: "underline" }}>
                Rekisteröidy
              </Title>
              <FloatingLabelInput
                ref={this.emailInput}
                label="Email"
                onChangeText={email => this.setState({ email })}
                value={email}
                autoFocus={true}
                keyboardAppearance="dark"
                keyboardType="email-address"
                onSubmitEditing={() => this.displayNameInput.focus()}
              />
              <FloatingLabelInput
                label="Nimimerkki"
                onChangeText={displayName => this.setState({ displayName })}
                value={displayName}
                keyboardAppearance="dark"
                keyboardType="email-address"
                onSubmitEditing={() => this.passwordInput.focus()}
                inputRef={ref => (this.displayNameInput = ref)}
              />
              <FloatingLabelInput
                label="Salasana"
                onChangeText={password => this.setState({ password })}
                value={password}
                keyboardAppearance="dark"
                keyboardType="email-address"
                inputRef={ref => (this.passwordInput = ref)}
              />
              {/* <FloatingLabelInput
              label="Salasanan varmistus"
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
              value={this.state.confirmPassword}
            /> */}
              <Title>{error && error.message}</Title>
              {loading ? (
                <Title>Loading!</Title>
              ) : (
                <RegisterButton
                  onPress={() => register({ variables: this.state })}
                  disabled={disableSubmit}
                >
                  <Title
                    style={{ color: disableSubmit ? "gray" : "green" }}
                    big
                  >
                    Valmis
                  </Title>
                </RegisterButton>
              )}
            </RegisterContainer>
          );
        }}
      </Mutation>
    );
  }
}
