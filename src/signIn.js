import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import { useEffect, useState } from 'react';
import App from './App';
import {
    Link,
    useNavigate
  } from "react-router-dom";




const SignIn = () =>{
    const auth = getAuth();
    const navigate = useNavigate();
    const [imgURL,setImgURL] = useState(" ");
    const signInwithGoogle = async () =>{
      const  provider = new GoogleAuthProvider();
      signInWithPopup(auth,provider).then((result) => {
          const cred = GoogleAuthProvider.credentialFromResult(result);
          const token = cred.accessToken;
          const user = result.user;
          setImgURL(user.photoURL);
          
          // store the user info in the session storage

          sessionStorage.setItem('imgURL',user.photoURL);
          sessionStorage.setItem('uid',user.uid);
          sessionStorage.setItem('name',user.displayName);
          sessionStorage.setItem('isLoggedin',true);
          //navigate to the chat
          navigate("/chat");
          
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
    
        });
      
    };
    return(
      <div>

        <button onClick={signInwithGoogle}> Sign in With Google </button>
        

        
        
      </div>
    );
    
    };

export default SignIn;