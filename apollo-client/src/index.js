import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";

import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import "./styles.css";
import { MessageAdd } from "./MessageAdd";

// Subscriptions imports
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { MessageList } from "./MessageList";

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: `http://localhost:4000`
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
  // for SSR, use:
  // cache: new Cache().restore(window.__APOLLO_STATE__ || {})
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <MessageAdd />
        <MessageList />
      </div>
    </ApolloProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
