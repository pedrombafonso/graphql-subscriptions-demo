import React from "react";

import gql from "graphql-tag";
import { Subscription } from "react-apollo";
import { Message } from "./Message";

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription MessageAdded {
    messageAdded {
      user
      text
    }
  }
`;

export const MessageList = () => (
  <Subscription subscription={MESSAGE_ADDED_SUBSCRIPTION}>
    {({ data, loading }) => {
      console.log("data", data);
      if (!data) {
        return null;
      }
      const messageAdded = (data && data.messageAdded) || {};
      return <Message user={messageAdded.user} text={messageAdded.text} />;
    }}
  </Subscription>
);
