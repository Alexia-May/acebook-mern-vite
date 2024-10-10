import Post from "./Post";
import { Container } from "./styles/ListOfPosts.js";

function ListOfPosts(props) { //creating shallow array for good practice (no direct mutation in React)
  const sortedPosts = [...props.posts].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
  

  return(
    <Container> 
      {sortedPosts.map((post) => (
      <Post 
        key={post._id} 
        postId={post._id}
        userId={props.userId}
        postCreatorId={post.user._id}
        message={post.message} 
        dateCreated={post.dateCreated}
        username={post.user?.username}
        likes={post.likes}
        setPosts={post.setPosts}
        setDelete={props.setDelete}
        likeState={props.likeState}
        setLikeState={props.setLikeState}
      />
      ))}
    </Container>
  );
}

export default ListOfPosts;