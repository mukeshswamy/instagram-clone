import "./App.css";
import Posts from "./Posts";

function App() {
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
      <Posts
        imageURL="https://instagram.fblr4-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/75007391_164192394649271_54482691017029978_n.jpg?_nc_ht=instagram.fblr4-2.fna.fbcdn.net&_nc_cat=111&_nc_ohc=Nb--blSfGekAX-YtRkQ&tp=15&oh=d3dad46b2833af15b832b6b86a29a96a&oe=5FD64409"
        username="Samuel David"
        caption="Love the view"
      />
      {/* Posts */}
      {/* Posts */}
    </div>
  );
}

export default App;
