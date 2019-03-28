const { ApolloServer, gql, PubSub } = require("apollo-server");
// const { ApolloServer } = require("apollo-server-express");

const pubsub = new PubSub();

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    messageAdd(user: String, text: String): Boolean
  }

  type Subscription {
    messageAdded: Message
  }

  type Message {
    user: String
    text: String
  }
`;

const MESSAGE_ADDED = "MESSAGE_ADDED";

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!"
  },
  Mutation: {
    messageAdd(root, args, context) {
      console.log("messageAdd", args);
      pubsub.publish(MESSAGE_ADDED, { messageAdded: args });
      return true;
    }
  },
  Subscription: {
    messageAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.info("Subscriptions: open connection");
    },
    onDisconnect: (webSocket, context) => {
      console.info("Subscriptions: close connection");
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
