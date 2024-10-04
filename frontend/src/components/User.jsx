function User(props) {
  return(
    <>
    <a data-testid="user-link" href={`/user/${props.user._id}`}>{props.user.username}</a>
    </>
  )
}

export default User