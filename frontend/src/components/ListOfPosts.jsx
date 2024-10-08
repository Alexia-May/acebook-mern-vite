import Post from "./Post";

function ListOfPosts(props) { //creating shallow array for good practice (no direct mutation in React)
  const sortedPosts = [...props.posts].sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));

  return(
    <div className="feed-component" role="feed-component"> 
      {sortedPosts.map((post) => (
      <Post 
        key={post._id} 
        message={post.message} 
        dateCreated={post.dateCreated}
        username={post.user?.username}
        noOfLikes={post.noOfLikes}
      />
      ))}
    </div>
  );
}

export default ListOfPosts;