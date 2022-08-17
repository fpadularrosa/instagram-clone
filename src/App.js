import './App.css';
import { useEffect, useState } from 'react';
import Post from './components/Post';
import { db } from './fire_base';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles((theme) => ({
  paper:{
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows(5),
    padding: theme.spacing(2, 4, 3)
  }
}))

function App() {
  const [ posts, setPosts ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ modalStyle ] = useState(getModalStyle)
  const classes = useStyles();

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
    
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <h2>Soy un modal</h2>
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
        posts.map(({ id, post })=> <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>)
      }
    </div>
  );
}

export default App;
