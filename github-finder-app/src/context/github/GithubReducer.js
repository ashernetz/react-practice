import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER_AND_REPOS,
  GET_USERS,
  SET_LOADING,
  SET_USER_DATA,
} from './constants'

const githubReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload }
    case GET_USERS:
      return { ...state, users: action.payload, isLoading: false }
    case GET_REPOS:
      return { ...state, repos: action.payload }
    case SET_USER_DATA:
      return { ...state, user: action.payload, isLoading: false }
    case GET_USER_AND_REPOS:
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        isLoading: false,
      }
    case CLEAR_USERS:
      return { ...state, users: [] }
      detault: return state
  }
}

export default githubReducer
