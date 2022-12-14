import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
    query Users {
        users {
        _id
        bodyParts {
            _id
        }
        exercises {
            _id
        }
        history {
            _id
        }
        loggedIn
        name
        password
        templates {
            _id
        }
    }
}
`;

export const QUERY_USER = gql`
query User($id: ID!) {
    user(_id: $id) {
      _id
      bodyParts {
        _id
      }
      exercises {
        _id
      }
      history {
        _id
      }
      loggedIn
      name
      password
      templates {
        _id
      }
    }
  }
`;

export const QUERY_HISTORYS = gql`
query History($historyId: ID!) {
    history(historyId: $historyId) {
      _id
      createdAt
      exercises {
        _id
      }
      length
      templateId
      updatedAt
    }
  }
`;

export const QUERY_HISTORY = gql`
query History($historyId: ID!) {
    history(historyId: $historyId) {
      _id
      createdAt
      exercises {
        _id
      }
      length
      templateId
      updatedAt
    }
  }
`;

export const QUERY_TEMPLATES = gql`
  query templates {
    templates {
      exercises {
        _id
        name
      }
    }
  }
`;

export const QUERY_TEMPLATE = gql`
query Template($id: ID!) {
    template(_id: $id) {
      _id
      default
      exercises {
        _id
      }
      name
    }
  }
`;

export const QUERY_EXERCISE_TYPES = gql`
query ExerciseTypes {
    exerciseTypes {
      _id
      bodyParts {
        _id
      }
      name
    }
  }
`;

export const QUERY_EXERCISE_TYPE = gql`
query ExerciseType($id: ID!) {
    exerciseType(_id: $id) {
      _id
      bodyParts {
        _id
      }
      name
    }
  }
`;

export const QUERY_EXERCISE_INSTANCES = gql`
query ExerciseInstances {
    exerciseInstances {
      _id
      exerciseType {
        _id
      }
      sets {
        _id
        reps
        weight
      }
    }
  }
`;

export const QUERY_EXERCISE_INSTANCE = gql`
query ExerciseInstance($id: ID!) {
    exerciseInstance(_id: $id) {
      _id
      exerciseType {
        _id
      }
      sets {
        _id
        reps
        weight
      }
    }
  }
`;

export const QUERY_BODY_PARTS = gql`
query BodyParts {
    bodyParts {
      _id
      name
    }
  }
`;

export const QUERY_BODY_PART = gql`
query BodyParts($id: ID!) {
    bodyPart(_id: $id) {
      _id
      name
    }
  }
`;