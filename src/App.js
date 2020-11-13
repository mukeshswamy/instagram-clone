import {useState, useEffect} from "react";
import "./App.css";
import Posts from "./Posts";
import {db} from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);
  // useEffects Runs a piece of code based on a specific condition
  useEffect(() => {
    db.collection('posts').onSnapshot(snapShot => {
      // Modified into objects
      setPosts(snapShot.docs.map(doc => ({
        id: doc.id,
        post:doc.data()
      })));
    })
  }, [posts])
  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt="logo"
        />
      </div>
      {
        // Array Destructed
        posts.map(({post,id}) => (
          <Posts key={id} username={post.username} imageURL={post.imageURL} caption={post.caption}/>
        ))
      }
    </div>
  );
}

export default App;
