import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        name
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($name: String!, $password: String!) {
    addUser(name: $name, password: $password) {
      token
      user {
        name
      }
    }
  } 
`;

export const ADD_HISTORY = gql`
mutation addHistory($userId: ID!, $templateId: ID!, $exercises: [ID], $length: Int) {
    addHistory(userId: $userId, templateId: $templateId, exercises: $exercises, length: $length) {
      _id
    }
  }
`;

export const ADD_TEMPLATE = gql`
mutation addTemplate($userId: ID!, $exercises: [ID]!, $name: String) {
    addTemplate(userId: $userId, exercises: $exercises, name: $name) {
      _id
    }
  }
`;

export const UPDATE_TEMPLATE = gql`
mutation updateTemplate($id: ID!, $name: String!, $exercises: [ID]!) {
    updateTemplate(_id: $id, name: $name, exercises: $exercises) {
      _id
    }
  }
`;

export const REMOVE_TEMPLATE = gql`
mutation removeTemplate($id: ID!) {
    removeTemplate(_id: $id) {
      _id
    }
  }
`;

export const ADD_EXERCISE_TYPE = gql`
mutation AddExerciseType($userId: ID!, $bodyParts: [ID]!, $name: String) {
    addExerciseType(userId: $userId, bodyParts: $bodyParts, name: $name) {
      _id
    }
  }
`;

export const UPDATE_EXERCISE_TYPE = gql`
mutation UpdateExerciseType($id: ID!, $name: String!, $bodyParts: [ID]!) {
    updateExerciseType(_id: $id, name: $name, bodyParts: $bodyParts) {
      _id
    }
  }
`;

export const REMOVE_EXERCISE_TYPE = gql`
mutation RemoveExerciseType($id: ID!) {
    removeExerciseType(_id: $id) {
      _id
    }
  }
`;

export const ADD_EXERCISE_INSTANCE = gql`
mutation AddExerciseType($userId: ID!, $exerciseType: ID, $sets: [setInput]) {
  addExerciseInstance(userId: $userId, exerciseType: $exerciseType, sets: $sets) {
    _id
  }
}
`;

export const UPDATE_EXERCISE_INSTANCE = gql`
mutation UpdateExerciseInstance($id: ID!, $sets: [setInput]) {
    updateExerciseInstance(_id: $id, sets: $sets) {
      _id
    }
  }
`;

export const REMOVE_EXERCISE_INSTANCE = gql`
mutation RemoveExerciseInstance($id: ID!) {
    removeExerciseInstance(_id: $id) {
      _id
    }
  }
`;

export const ADD_BODY_PART = gql`
mutation AddBodyPart($userId: ID!, $name: String) {
    addBodyPart(userId: $userId, name: $name) {
      _id
    }
  }
`;

export const UPDATE_BODY_PART = gql`
mutation UpdateBodyPart($id: ID!, $name: String) {
    updateBodyPart(_id: $id, name: $name) {
      _id
    }
  }
`;

export const REMOVE_BODY_PART = gql`
mutation RemoveBodyPart($id: ID!) {
    removeBodyPart(_id: $id) {
      _id
    }
  }
`;