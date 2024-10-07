import { UserName } from './User.styled.js';

function User(props) {
  return(
    <UserName data-testid="user-link" href={`/user/${props.user._id}`}>{props.user.username}</UserName>
  )
}

export default User