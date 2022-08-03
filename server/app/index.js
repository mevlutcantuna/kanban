const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 8080;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose
    .connect(process.env.MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    .then(() => {
      app.listen(PORT, () =>
        console.log(
          `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
        )
      );
    })
    .catch((err) => console.log("error", err));
};

startServer();
