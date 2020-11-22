import { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Posts";
import { auth, db } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { Button, Input, makeStyles } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {
          // Dont update the username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      // perform some cleanup action
      unsubscribe();
    };
  }, [user, username]);
  // useEffects Runs a piece of code based on a specific condition
  useEffect(() => {
    db.collection("posts").onSnapshot((snapShot) => {
      // Modified into objects
      setPosts(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, [posts]);
  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser.user.displayName);
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
                alt="logo"
              />
            </center>
            <Input
              placeholder="uesername"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signup}>Sign up</Button>
          </form>
        </div>
      </Modal>
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt="logo"
        />
      </div>
      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      {
        // Array Destructed
        posts.map(({ post, id }) => (
          <Posts
            key={id}
            username={post.username}
            imageURL={post.imageURL}
            caption={post.caption}
          />
        ))
      }
    </div>
  );
}

export default App;
