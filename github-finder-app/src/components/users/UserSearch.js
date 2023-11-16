import { useState, useContext } from 'react'
import { isEmpty } from 'underscore'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
import {searchUserById, searchUsers} from "../../context/github/GithubActions";


function UserSearch() {
  const [text, setText] = useState('')
  const { users,  setUsersData, clearUsers, dispatch } =
    useContext(GithubContext)

  const { setAlert, displayError } = useContext(AlertContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    !isEmpty(text)
      ? searchUsersByName()
      : displayError('Please enter something')
  }

  const searchUsersByName = async () => {
    const users = await searchUsers(text);
    setUsersData(users)
    setText('')
  }

  const handleClear = () => {
    clearUsers()
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='search'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className='absolute top-0 right-0 rounder-l-none w-36 btn btn-lg'
                type='submit'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {!isEmpty(users) && (
        <div>
          <button className='btn btn-ghost btn-lg' onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
