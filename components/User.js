import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Text, View } from "react-native";

export const USER_INFO_QUERY = gql`
  query USER_INFO_QUERY {
    me {
      bidTokens
      purchaseTokens
      user {
        displayName
        permissions
      }
    }
  }
`;

export default class User extends Component {
  render() {
    return (
      <Query query={USER_INFO_QUERY}>
        {({ client, data, error, loading }) =>
          loading ? (
            <Text> Loading </Text>
          ) : (
            this.props.children({ client, user: data.me })
          )
        }
      </Query>
    );
  }
}
