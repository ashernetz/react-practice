import { PacmanLoader } from 'react-spinners'
function Spinner() {
  return (
    <div className='flex justify-center w-full loadingSpinnerContainer'>
      <PacmanLoader color='#36d7b7' className='loadingSpinner' />
    </div>
  )
}

export default Spinner
