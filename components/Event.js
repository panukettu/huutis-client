import React, { Component } from "react";
import { Query } from "react-apollo";
import { Text, Image } from "react-native";
import { Title } from "../styles/layouts";
import styled from "styled-components";
import gql from "graphql-tag";
import colors, { toRgba } from "../styles/colors";
import Product from "./Product";

const EventsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const EventContainer = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 2px;
  width: ${props => (props.type === "FAST" ? "47%" : "94%")};
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.75);
  margin-bottom: 10px;
`;

const BidButton = styled.TouchableOpacity`
  background-color: ${toRgba("#72ff9c", 0.5)};
  width: 100%;
  padding: 3px;
`;

const BidText = styled.Text`
  text-align: center;
  font-size: 30;
  font-family: lobster;
  color: white;
`;

const EVENT_QUERY = gql`
  query events {
    events {
      id
      description
      type
      product {
        id
        name
        image
        price
        description
      }
    }
  }
`;

export default class Events extends Component {
  state = {
    productId: null
  };

  viewProduct = id => {
    this.setState({ productId: id });
  };

  render() {
    return (
      <EventsContainer>
        {!this.state.productId ? (
          <Query query={EVENT_QUERY}>
            {({ loading, data, error }) =>
              loading ? (
                <Title>Loading</Title>
              ) : (
                data.events.map(event => (
                  <EventContainer
                    key={event.id}
                    type={event.type}
                    onPress={() => this.viewProduct(event.product.id)}
                  >
                    <Title>{event.product.name}</Title>
                    <Image
                      source={IMAGES[event.product.image.split(".")[0]]}
                      style={{ width: 200, height: 250, marginBottom: 20 }}
                    />
                    <Title style={{ fontSize: 25 }}>
                      {event.product.description}
                    </Title>
                    <BidButton
                      style={{
                        borderTopColor: "rgba(255,255,255,0.75)",
                        borderTopWidth: 2
                      }}
                    >
                      <BidText>Huuda!</BidText>
                    </BidButton>
                  </EventContainer>
                ))
              )
            }
          </Query>
        ) : (
          <EventsContainer>
            <Product id={this.state.productId} />
          </EventsContainer>
        )}
      </EventsContainer>
    );
  }
}

const IMAGES = {
  3310: require("../assets/3310.png"),
  iphonex: require("../assets/iphonex.png")
};
