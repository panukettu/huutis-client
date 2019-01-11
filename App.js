import React from "react";
import { Text } from "react-native";
import { Font, SecureStore } from "expo";
import Navigator from "./pages/Navigator";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, from } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { setContext } from "apollo-link-context";

import Drawer from "./components/Drawer";

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const {
      response: { headers }
    } = operation.getContext();
    if (headers) {
      const token = headers.get("x-token");
      console.log("token set: ", token);
      const refreshToken = headers.get("x-refresh-token");
      if (token) {
        SecureStore.setItemAsync("huutis_token", token);
      }

      if (refreshToken) {
        SecureStore.setItemAsync("huutis_refreshToken", refreshToken);
      }
    }
    return response;
  });
});

const getAuthLink = setContext(
  () =>
    new Promise(success =>
      SecureStore.getItemAsync("huutis_token").then(token => {
        if (token) success({ headers: { authorization: token } });
        else success();
      })
    )
);

const httpLink = new HttpLink({
  uri: "http://192.168.1.105:4000",
  credentials: "include"
});

const webSocketLink = new WebSocketLink(
  new SubscriptionClient("ws://192.168.1.105:4000", {
    reconnect: true
  })
);

const client = new ApolloClient({
  link: from([afterwareLink, getAuthLink, httpLink, webSocketLink]),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  state = {
    loading: true,
    showDrawer: false,
    drawerComponent: null
  };

  async componentDidMount() {
    await Font.loadAsync({
      lobster: require("./assets/fonts/Lobster-Regular.ttf")
    });
    this.setState({ loading: false });
  }

  toggleDrawer = (drawerComponent, close) => {
    if (close) {
      this.setState({ showDrawer: false });
    } else {
      this.setState(state => {
        const showDrawer = drawerComponent !== state.drawerComponent;
        return {
          showDrawer,
          drawerComponent
        };
      });
    }
  };

  render() {
    const { showDrawer, loading, drawerComponent } = this.state;
    return (
      <ApolloProvider client={client}>
        {showDrawer && <Drawer>{drawerComponent}</Drawer>}
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <Navigator
            screenProps={{ toggleDrawer: this.toggleDrawer, showDrawer }}
          />
        )}
      </ApolloProvider>
    );
  }
}
