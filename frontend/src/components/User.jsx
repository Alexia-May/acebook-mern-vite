import { UserName } from './styles/User.styled.js';

function User(props) {
  console.log("user props", props)
  return(
    <UserName data-testid="user-link" href={`/user/${props._id}`}>{props.username}</UserName>
  )
}

export default User