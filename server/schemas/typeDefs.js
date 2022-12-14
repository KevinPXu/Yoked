const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    password: String
    templates: [Template]!
    exercises: [ExerciseType]!
    bodyParts: [BodyPart]!
    history: [History]!
    loggedIn: Boolean
  }

  type Template {
    _id: ID
    name: String
    exercises: [ExerciseInstance]!
    default: Boolean
  }

  type History {
    templateId: ID
    _id: ID
    exercises: [ExerciseInstance]
    length: Int
    createdAt: String
    updatedAt: String
  }

  type ExerciseType {
    _id: ID
    name: String
    bodyParts: [BodyPart]!
  }

  type ExerciseInstance {
    _id: ID
    exerciseType: ExerciseType
    sets: [Set]
  }

  type Set {
    _id: ID
    reps: Int
    weight: Int
  }

  input setInput {
    reps: Int
    weight: Int
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
    exerciseTypes: [ExerciseType]
    exerciseType(_id: ID!): ExerciseType
    exerciseInstances: [ExerciseInstance]
    exerciseInstance(_id: ID!): ExerciseInstance
    bodyParts: [BodyPart]
    bodyPart(_id: ID!): BodyPart
  }

  type Mutation {
    addUser(name: String!, password: String!): Auth
    login(name: String!, password: String!): Auth
    addHistory(userId: ID!, templateId: ID!, exercises: [ID], length: Int): History
    addTemplate(userId: ID!, name: String, exercises: [ID]!): Template
    updateTemplate(_id: ID!, name: String!, exercises: [ID]!): Template
    removeTemplate(_id: ID!): Template
    addExerciseType(userId: ID!, name: String, bodyParts: [ID]!): ExerciseType
    updateExerciseType(_id: ID!, name: String!, bodyParts: [ID]!): ExerciseType
    removeExerciseType(_id: ID!): ExerciseType
    addExerciseInstance(userId: ID!, exerciseType: ID, sets: [setInput]): ExerciseInstance
    updateExerciseInstance(_id: ID!, sets: [setInput]): ExerciseInstance
    removeExerciseInstance(_id: ID!): ExerciseInstance
    addBodyPart(userId: ID!, name: String): BodyPart
    updateBodyPart(_id: ID!, name: String): BodyPart
    removeBodyPart(_id: ID!): BodyPart
  }
`;

module.exports = typeDefs;
