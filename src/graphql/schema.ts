export const typeDefs = `#graphql 
type User {
    id: ID!
    name: String
    email: String
    emailVerified: Boolean
    phoneVerified: Boolean
    onboarded: Boolean
  }

  type Query {
	getUser(id: ID!): User 
  

  }

  type Mutation {
    register(name:String,email:String,password:String!):User! 
    login(email:String,password:String!): String!

  }
`;
