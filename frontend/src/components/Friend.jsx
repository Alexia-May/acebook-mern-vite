import { UserName } from "./styles/User.styled";

function Friend(props) {
  return(
    <UserName data-testid="user-link" href={`/user/${props._id}`}>{props.username}</UserName>
  )
    }
    
    export default Friend;
    