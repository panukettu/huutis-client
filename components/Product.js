import React, { Component } from "react";
import { Text, View } from "react-native";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const PRODUCT_QUERY = gql`
  query product($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      description
      price
      image
      imageLarge
      createdAt
      updatedAt
    }
  }
`;

export default class Product extends Component {
  render() {
    return (
      <View>
        <Query query={PRODUCT_QUERY} variables={{ id: this.props.id }}>
          {({ loading, error, data: { product } }) => {
            if (error) {
              console.log(error);
            }
            if (loading) {
              return (
                <View>
                  <Text>Loading</Text>
                </View>
              );
            }
            return (
              <View>
                <Text>{product.id}</Text>
              </View>
            );
          }}
        </Query>
      </View>
    );
  }
}
