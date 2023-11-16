import { useContext } from 'react'
import { PacmanLoader } from 'react-spinners'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'
import GithubContext from '../../context/github/GithubContext'

function UserResults() {
  const { users, isLoading, fetchUsers } = useContext(GithubContext)
  const renderUsers = () => {
    return users.length > 0 ? (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => {
          return <UserItem User={user} key={user.id} />
        })}
      </div>
    ) : (
      <h1>No users</h1>
    )
  }

  return <>{!isLoading ? renderUsers() : <Spinner />}</>
}

export default UserResults
