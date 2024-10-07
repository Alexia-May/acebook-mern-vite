import { useState, useEffect } from 'react';

import {
  Container,
  Button,
  PostContainer,
  PostHeader,
  UserContainer,
  UserDetails,
  UserName,
  TimeStamp,
  TextContent,
  Footer,
  Image
} from './Post.styled.js'; // Make sure to update this path

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
    const getRandomAvatar = () => {
      const avatarCount = 6; 
      const randomIndex = Math.floor(Math.random() * avatarCount) + 1;
      return `src/assets/userAvatars/${randomIndex}.svg`;
    };
    setAvatar(getRandomAvatar());
  }, []);

  return (
    <Container>
    <PostContainer key={props.id}>
      <PostHeader>
        <UserContainer>
          <Image src={avatar} alt="User Avatar" />
          <UserDetails>
            <UserName data-testid="username">{props.username}</UserName>
            <TimeStamp data-testid="dateCreated">
              {getDateString(props.dateCreated)}
            </TimeStamp>
          </UserDetails>
        </UserContainer>
      </PostHeader>
      <TextContent data-testid="message">{props.message}</TextContent>
      <Footer>
        <Button data-testid="numberOfLikes">{props.noOfLikes} Likes</Button>
      </Footer>
    </PostContainer>
    </Container>
  );
}

export default Post;
