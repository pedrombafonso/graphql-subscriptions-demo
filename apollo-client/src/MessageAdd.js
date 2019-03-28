import React from "react";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const MESSAGE_ADD = gql`
  mutation MessageAdd($user: String!, $text: String!) {
    messageAdd(user: $user, text: $text)
  }
`;

export const MessageAdd = () => {
  let user;
  let message;

  return (
    <Mutation mutation={MESSAGE_ADD}>
      {(messageAdd, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              messageAdd({
                variables: { user: user.value, text: message.value }
              });
              user.value = "";
              message.value = "";
            }}
          >
            <input
              ref={node => {
                user = node;
              }}
            />
            <input
              ref={node => {
                message = node;
              }}
            />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};
