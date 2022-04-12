
const http = require("http");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const schema_1 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");

const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 4000;
async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);


  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));

  const server = new ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: PORT}, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);

  // Add a Dev Environment Later
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("/*", (req, res) => {
      console.log("Hello")
      const index = path.join(__dirname, "client", "build", "index.html");
      res.sendFile(index);
    });
  }
}

startApolloServer();
