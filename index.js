const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { graphqlHTTP } = require("express-graphql");
const isAuth = require("./middleware/is-auth");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();
app.use(bodyParser.json());

app.use(helmet());
app.use(isAuth);
app.use("/graphql",graphqlHTTP({
    schema: graphQlSchema ,
    rootValue: graphQlResolvers,
    graphiql: true
}))

mongoose.connect(`
mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ckvwl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
{useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
    app.listen(8000);
    console.log("server is running");
}).catch(err => {
    throw err
})
