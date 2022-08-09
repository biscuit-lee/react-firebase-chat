import './App.css';
import { useEffect, useState } from 'react';
import SignIn from './signIn';
 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDocs} from 'firebase/firestore/lite';
import {onSnapshotsInSync} from 'firebase/firestore'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {onSnapshot,Firestore,collection,orderBy, query,getFirestore,addDoc,limit} from '@firebase/firestore';

  // Initiate firebase
  
  const firebaseConfig = {
    apiKey: "AIzaSyD_7Ww59ztI9pRZR98pC-dadpUMpY9MDbE",
    authDomain: "pictionary-84009.firebaseapp.com",
    projectId: "pictionary-84009",
    storageBucket: "pictionary-84009.appspot.com",
    messagingSenderId: "681377624120",
    appId: "1:681377624120:web:6197819d6bedf1074ab6cd",
    measurementId: "G-H9N2KRW6ND"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const dbRef = collection(db,'messages');
  
  
  

function App() {
  return (
    <Router>
      <div>
        <div className='navbar'>
          <nav className='nbar'>
            <h1>Epic Chat app</h1>

          </nav>
        </div>
        
        <Routes>
        
          <Route exact path = "/chat" element={<Chat />}/>  
          <Route exact path = "/" element={<SignIn/>} />
          
        </Routes>
        
        
      </div>
      
    </Router>
  );
}

function Chat(){

  const [input,setInput] = useState(" ");
  const [chat,setChat] = useState([]);
  
  let imgURL = sessionStorage.getItem('imgURL');
  let  p_style = 'speech_arrow_other message bgcolor-other'
  let  chat_style = 'chatMessage-other';
  
  useEffect( () => {
    const q = query(dbRef,orderBy("timestamp"));

    onSnapshot(q, (snapshot) => {
      setChat((snapshot.docs.map(
        (d) => ({...d.data(),id:d.id})
        
      )));
      
    });
    
  //   const display_chat = async () =>{
  //     //let data = await getDocs(collection(db,'messages'));
      
  // //setChat(data.docs.map((d) => ({...d.data(),id:d.id})));
      
    // onSnapshot(dbRef,(snapshot) => {
      
    //   console.log(snapshot)
    // });
  //   }
  //   display_chat()
  },[]);





  const handleSubmit = (e) =>{
    const data2 = {
      content: input,
      uid: sessionStorage.getItem('uid'),
      timestamp: Date.now(),
      imgURL: sessionStorage.getItem('imgURL')
    }
    addDoc(dbRef,data2);
    setInput(" ")
    e.preventDefault();
    
  }
  
  
  return(

    <div>
      <div className='chatArea'>
        {
          
          chat.map((d) => {  
            
            if(d.uid === sessionStorage.getItem('uid')){
              p_style = 'speech_arrow_self message bgcolor-self';
              chat_style = 'chatMessage-self';
             }else{
              p_style = 'speech_arrow_other message bgcolor-other'
              chat_style = 'chatMessage-other';
            }


            return(
            <div className={chat_style}>
              
              <img className='child1' src={d.imgURL} alt="Profile Image" />
              <p className={p_style}>{d.content}</p>
              
            </div>
          )})
        }
      </div>


      <div>
        <form className="inputBox" onSubmit={handleSubmit}>
          <input className="inputField" value={input} onChange={(e) => setInput(e.target.value)} type="text"></input>
          <input className="submitBtn" type="submit"></input>
        </form>
      </div>
    </div>

    
  );

}

export default App;
