import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'
import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER_AND_REPOS,
  GET_USERS,
  SET_LOADING,
  SET_USER_DATA,
} from './constants'
import { setTimeOutFn } from '../../utilities/functionUtils'
const GithubContext = createContext()
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
export const GithubProvider = ({ children }) => {
  //const [users, setUsers] = useState([])
  //const [isLoading, setIsLoading] = useState(false)
  const initialState = {
    users: [],
    isLoading: false,
    user: {},
    repos: [],
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)

  const changeIsLoading = (isLoading) => {
    dispatch({
      type: SET_LOADING,
      payload: isLoading,
    })
  }
  const setUsersData = (data) => {
    changeIsLoading(true)
    dispatch({
      type: GET_USERS,
      payload: data,
    })
  }

  const setDataToUser = (data) => {
    dispatch({
      type: SET_USER_DATA,
      payload: data,
    })
  }

  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    })
  }

  const setRepos = (data) => {
    dispatch({
      type: GET_REPOS,
      payload: data,
    })
  }

  const setUserAndRepos = (data) => {
    console.log(data)
    dispatch({
      type: GET_USER_AND_REPOS,
      payload: { user: data.user, repos: data.repos },
    })
  }

  const setUsersDataTime = setTimeOutFn(setUsersData, 3000)

  const fetchUsers = async () => {
    //setIsLoading(true)
    changeIsLoading(true)
    const res = await fetch(`${GITHUB_URL}users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const data = await res.json()
    setTimeout(() => {
      //setIsLoading(false)
      setUsersData(data)
    }, 3000)
    //setUsers(data)
  }

  const searchUsers = async (text) => {
    changeIsLoading(true)
    const params = new URLSearchParams({
      q: text,
    })
    const res = await fetch(`${GITHUB_URL}search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const data = await res.json()
    setUsersData(data.items)
    changeIsLoading(false)
  }

  const searchUserById = async (id) => {
    changeIsLoading(true)
    const res = await fetch(`${GITHUB_URL}users/${id}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    if (res.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await res.json()
      console.log(data)
      setDataToUser(data)
      changeIsLoading(false)
    }
  }

  const getReposByUser = async (user) => {
    changeIsLoading(true)
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    })
    const res = await fetch(`${GITHUB_URL}users/${user}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const data = await res.json()
    setRepos(data)
    changeIsLoading(false)
  }

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        fetchUsers,
        setUsersData,
        clearUsers,
        changeIsLoading,
        setDataToUser,
        setRepos,
        setUserAndRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export default GithubContext
