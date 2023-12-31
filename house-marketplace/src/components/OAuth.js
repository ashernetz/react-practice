import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';
import FireBaseUtil from '../utils/FireBase.util';

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleClick = async () => {
    alert('click');
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate('/');
      }
      console.log(user);
    } catch (e) {
      console.log(e);
      toast.error('could not authorize with google')
    }
  };
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
      <button className="socialIconDiv" onClick={handleGoogleClick}>
        <img src={googleIcon} alt="Google login" className="socialIconImg" />
      </button>
    </div>
  );
}

export default OAuth;
