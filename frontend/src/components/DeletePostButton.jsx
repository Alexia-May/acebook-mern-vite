import { deletePost } from "../services/posts";
import { DeleteButton } from "./styles/Post.styled.js";

function DeletePostButton(props) {

    const handleDelete = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

    const loggedIn = token !== null;
    if (loggedIn) {
      //setDelete(true);
        try {
            await deletePost(token, props.postId);
            props.setDelete([""]);
        } catch (err) {
        console.log("Error deleting post:", err);
        }
    }
    };

  // Only render the delete button if the logged-in user is the creator of the post
    const isCreator = props.userId === props.postCreatorId;

    if (!isCreator) {
        return null;
    }

    return (
        <div className="DeleteContainer">
        <form onSubmit={handleDelete}>
            <DeleteButton className="DeleteButton">
                Delete
            </DeleteButton>
        </form>
        </div>
    );
}

export default DeletePostButton;

