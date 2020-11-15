const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLSchema, GraphQLString } = graphql;

const books = require('../data/book.json');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: graphql.GraphQLInt },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: graphql.GraphQLInt }
      },
      resolve: (source, args) => {
        return _.find(books, {
          id: args.id
        })
      }
    },
    books: {
      type: graphql.GraphQLList(BookType),
      args: {
        id: { type: graphql.GraphQLInt },
        name: { type: GraphQLString }
      },
      resolve: (source, args) => {
        let results = books;

        if (args.id) {
          results = results.filter((book) => book.id === args.id)
        }

        if (args.name) {
          results = results.filter((book) => book.name === args.name)
        }

        return results;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
