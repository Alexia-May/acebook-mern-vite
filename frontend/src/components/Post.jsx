import { useState, useEffect } from 'react';
import { getRandomAvatar } from "../handlers/avatarUtils.js"
import  DeletePostButton  from "./DeletePostButton.jsx";
import User from './User.jsx'

import {
  Container,
  Button,
  PostContainer,
  PostHeader,
  UserContainer,
  UserDetails,
  TimeStamp,
  TextContent,
  Footer,
  Image
} from './styles/Post.styled.js'; 

function Post(props) {
  const [avatar, setAvatar] = useState('');

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
    setAvatar(getRandomAvatar());
  }, []);

  return (
    <Container>
    <PostContainer key={props.id}>
      <PostHeader>
        <UserContainer>
          <Image src={avatar} alt="User Avatar" />
          <UserDetails>
            <User 
              user={{ 
                _id: props.user?._id, 
                username: props.username
              }} 
            />
            <TimeStamp data-testid="dateCreated">
              {getDateString(props.dateCreated)}
            </TimeStamp>
          </UserDetails>
        </UserContainer>
      </PostHeader>
      <TextContent data-testid="message">{props.message}</TextContent>
      <Footer>
        <Button data-testid="numberOfLikes">{props.noOfLikes} Likes</Button>
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
  );
}

export default Post;
