import Post from "./Post";

function ListOfPosts(props) { //creating shallow array for good practice (no direct mutation in React)
  const sortedPosts = [...props.posts].sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));

  return(
    <div className="feed-component" role="feed-component"> 
      {sortedPosts.map((post) => (
      <Post 
        key={post._id}
        postId={post._id}
        userId={post.user._id}
        postCreatorId={post.user._id}
        message={post.message} 
        dateCreated={post.dateCreated}
        username={post.user?.username}
        noOfLikes={post.noOfLikes}
        setPosts={props.setPosts}
        
      />
      ))}
    </div>
  );
}

export default ListOfPosts;