const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID
} = graphql;

const books = require('../data/book.json');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: GraphQLID },
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
        id: { type: GraphQLID }
      },
      resolve: (source, args) => {
        console.log(typeof args.id);
        return _.find(books, {
          id: args.id
        })
      }
    },
    books: {
      type: graphql.GraphQLList(BookType),
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve: (source, args) => {
        console.log(typeof args.id);
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
