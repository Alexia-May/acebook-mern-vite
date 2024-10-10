import { UserName } from './styles/User.styled.js';

function User(props) {
  console.log("user props", props)
  return(
    <UserName data-testid="user-link" href={`/user/${props.user._id}`}>{props.user.username}</UserName>
  )
}

export default User