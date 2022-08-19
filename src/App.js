import './App.css';
import { useEffect, useState } from 'react';
import Post from './components/Post';
import { db, auth } from './fire_base';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Modal, Button, Input } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function App() {
  const [ posts, setPosts ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ openSignIn, setOpenSignIn ] = useState(false);
  const [ password, setPassword ] = useState('');
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //user has logged in...
        console.log(authUser)
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    });

    return () => {
      //perfom some cleanup actions
      unsubscribe();
    }
  }, [ user ])

  useEffect(() => {
    async function getPosts () {
      //every time a new post added, this code fires.
      const postsCol = collection(db, 'posts');
      const postSnapshot = await getDocs(postsCol);
  
      const postsList = postSnapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      }))
      setPosts(postsList)
    }
    getPosts()
  }, []);

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then(user => {
      //signed in
      alert('usuario registrado.')
      return user.updateProfile({
        displayName: username
      })
    }, err => {
      alert(err.message)
    })
  }

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
    console.log(userCredential)
    alert(`User ${username} logged sucessfully.`)
    }, err => alert(err.message));
    setOpenSignIn(false);
  }

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}>
          <div className='modal_signUp'>
            <form className='app__signup'>
              <center>
                <img
                className='logo-instagram'
                src='https://i.pinimg.com/originals/57/6c/dd/576cdd470fdc0b88f4ca0207d2b471d5.png'
                alt='ig'
                />
              </center>
              <Input
                placeholder='Username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder='Email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type='submit'
                onClick={signUp}>
                Sign up
              </Button>
            </form>
          </div>
      </Modal>
      
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}>
          <div className='modal_signUp'>
            <form className='app__signup'>
              <center>
                <img
                className='logo-instagram'
                src='https://i.pinimg.com/originals/57/6c/dd/576cdd470fdc0b88f4ca0207d2b471d5.png'
                alt='ig'
                />
              </center>

              <Input
                placeholder='Correo electrónico'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder='Contraseña'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type='submit'
                onClick={signIn}>
                Sign in
              </Button>
            </form>
          </div>
      </Modal>
      <div className='header'>
        <img
          className='logo-instagram'
          src='https://i.pinimg.com/originals/57/6c/dd/576cdd470fdc0b88f4ca0207d2b471d5.png'
          alt='ig-logo'
        />
      </div>
      {
        user ?
        <Button onClick={() => auth.signOut()}>Logout</Button>
        :
        <div>
          <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
          <Button onClick={() => setOpen(true)}>Sign up</Button>
        </div>
      }

      {
        posts.map(({ id, post })=> <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>)
      }
    </div>
  );
}

export default App;
