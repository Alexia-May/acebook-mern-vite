
import { getRandomAvatar } from "../handlers/avatarUtils.js"
import { useState, useEffect } from "react";
import DeletePostButton from "./DeletePostButton.jsx";
import { handleAddLikeClick, handleDeleteLikeClick } from "../handlers/posts.js";
import User from "./User.jsx";
// import { Button } from "./Button.jsx";

import {
  Container,
  StyledButton,
  PostContainer,
  PostHeader,
  UserContainer,
  UserDetails,
  TimeStamp,
  TextContent,
  Footer,
  Image,
} from "./styles/Post.styled.js";

function Post(props) {
  const [avatar, setAvatar] = useState("");
  const [isLiked, setisLiked] = useState(false);
  const [isUserPost, setIsUserPost] = useState(false)

  const getDateString = (dateString) => {
    const date = new Date(dateString);
    let hour = date.getUTCHours();
    let meridium = "am";
    if (hour === 0) {
      hour = 12;
    }
    if (hour > 12) {
      meridium = "pm";
      hour -= 12;
    }
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);
    return `${hour}:${minutes}${meridium} - ${day}.${month}.${year}`;
  };

  useEffect(() => {
    const randomAvatar = getRandomAvatar();
    setAvatar(randomAvatar);
  }, []);

  useEffect(() => {
    console.log("likes", props.likes)
    console.log("userid", props.userId)
    if (props?.likes?.includes(props.userId)) {
      setisLiked(true);
    } else {
      setisLiked(false)
    }
    if (props.postCreatorId === props.userId) {
      setIsUserPost(true)
    } else {
      setIsUserPost(false)
    }
  }, [props.userId, props.likes, props.postCreatorId]);

  console.log("like state ", isLiked)



  return (
    <>
      <Container>
        <PostContainer key={props.id}>
          <PostHeader>
            <UserContainer>
              <Image src={avatar} alt="User Avatar" />
              <UserDetails>
                <User
                    _id={props.postCreatorId}
                    username={ props.username}
                />
                <TimeStamp data-testid="dateCreated">
                  {getDateString(props.dateCreated)}
                </TimeStamp>
              </UserDetails>
            </UserContainer>
          </PostHeader>
          <TextContent data-testid="message">{props.message}</TextContent>
          <Footer>
            {!isUserPost && isLiked && <button onClick={() => handleDeleteLikeClick(props.likeState, props.setLikeState, props.postId)}>Remove Like</button>}
            {!isUserPost && !isLiked && <button onClick={() => handleAddLikeClick(props.likeState, props.setLikeState, props.postId)}>Like</button>}
            <div data-testid="numberOfLikes">{`${props.likes?.length} Likes`}</div>
            <DeletePostButton
              postId={props.postId}
              userId={props.userId}
              postCreatorId={props.postCreatorId}
              setPosts={props.setPosts}
              setDelete={props.setDelete}
            />
          </Footer>
        </PostContainer>
      </Container>
    </>
  );
}

export default Post;
