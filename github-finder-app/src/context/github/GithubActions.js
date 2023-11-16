import axios from 'axios'
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
})

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await github.get(`search/users?${params}`)
  return response.data.items
}

// get user and repo
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
      github.get(`users/${login}`),
      github.get(`users/${login}/repos`),
  ])
  return {
    user: user.data,
    repos: repos.data
  }
}
/*
export const searchUserById = async (id) => {
  const res = await fetch(`${GITHUB_URL}users/${id}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })
  if (res.status === 404) {
    window.location = '/notfound'
  } else {
    return await res.json()
  }
}

export const getReposByUser = async (user) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })
  const res = await fetch(`${GITHUB_URL}users/${user}/repos?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })
  return await res.json()
}
*/
