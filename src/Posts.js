import React from "react";
import "./posts.css";
import Avatar from "@material-ui/core/Avatar";


function Posts({ imageURL, username, caption }) {
  return (
    <div className="posts">
      {/* Header -> avatar + username */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="https://instagram.fblr4-1.fna.fbcdn.net/v/t51.2885-15/e35/c0.135.1080.1080a/s150x150/26226641_201968630353149_7051720195563323392_n.jpg?_nc_ht=instagram.fblr4-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=-Qb7XfIQakEAX_W5T0k&tp=16&oh=ae4d9c1096966c5dc457cd02914f1348&oe=5FD497B6"
        />
        <h3>{username}</h3>
      </div>

      <img src={imageURL} alt="post" className="posts__image" />

      <h4 className="post__captions">
        <strong>{username} </strong>
        {caption}
      </h4>
    </div>
  );
}

export default Posts;
