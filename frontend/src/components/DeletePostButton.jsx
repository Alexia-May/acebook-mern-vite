import { useState } from "react";
import { deletePost } from "../services/posts";
import { getPosts } from "../services/posts";

function DeletePostButton(props) {
  const [isDeleting, setIsDeleting] = useState(false); // Track if the post is being deleted

  const handleDelete = async (event) => {
    event.preventDefault(); // Prevent default form behavior
    const token = localStorage.getItem("token"); // Get the stored token

    const loggedIn = token !== null;
    if (loggedIn) {
      setIsDeleting(true); // Set the deleting state to true when deleting starts
      try {
        // Call deletePost function
        await deletePost(token, props.postId);

        // Fetch the updated list of posts
        const postData = await getPosts(token);
        //props.setPosts(postData.posts); // Update the posts list after successful deletion

        // Optionally reset state or trigger additional UI updates
        props.setIsDeleting(false);
      } catch (err) {
        console.log("Error deleting post:", err);
        setIsDeleting(false); // Reset the deleting state if there’s an error
      }
    }
  };

  // Only show the button if the logged-in user is the creator of the post
  const isCreator = props.userId === props.postCreatorId;

  if (!isCreator) {
    return null; // Do not render the delete button if the user is not the creator
  }

  return (
    <div className="DeleteContainer">
      <form onSubmit={handleDelete}>
        <button className="DeleteButton" disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete Post"}
        </button>
      </form>
    </div>
  );
}

export default DeletePostButton;
