const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    password: String
    templates: [Template]!
    exercises: [Exercise]!
    bodyParts: [BodyPart]!
    history: [History]!
    loggedIn: Boolean
  }

  type Template {
    _id: ID
    name: String
    exercises: [Exercise]!
  }

  type History {
    _id: ID
    exercises: [Exercise]
    length: Int
    createdAt: String
    updatedAt: String
  }

  type Exercise {
    _id: ID
    name: String
    bodyParts: [BodyPart]!
    sets: Int
    reps: Int
  }

  type BodyPart {
    _id: ID
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    historys(userId: ID!): [History]
    history(historyId: ID!): History
    templates: [Template]
    template(_id: ID!): Template
    exercises: [Exercise]
    exercise(_id: ID!): Exercise
    bodyParts: [BodyPart]
    bodyPart(_id: ID!): BodyPart
  }

  type Mutation {
    addUser(name: String!, password: String!): Auth
    login(name: String!, password: String!): Auth
    addHistory(userId: ID!, exercises: [ID], length: Int): History
    addTemplate(userId: ID!, name: String, exercises: [ID]!): Template
    updateTemplate(_id: ID!, name: String!, exercises: [ID]!): Template
    removeTemplate(_id: ID!): Template
    addExercise(userId: ID!, name: String, bodyParts: [ID]!, sets: Int, reps: Int): Exercise
    updateExercise(_id: ID!, name: String!, bodyParts: [ID]!, sets: Int, reps: Int): Exercise
    removeExercise(_id: ID!): Exercise
    addBodyPart(userId: ID!, name: String): BodyPart
    updateBodyPart(_id: ID!, name: String): BodyPart
    removeBodyPart(_id: ID!): BodyPart
  }
`;

module.exports = typeDefs;
