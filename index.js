var express = require('express');
const app = express();
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const PORT = 4000;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}/graphql`));