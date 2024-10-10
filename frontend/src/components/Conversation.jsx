function Conversation(props) {
  return (
    <>
    <a href={`/messages/${props._id}`}>{props.title}</a>
    <div>{props.sender}: {props.message}</div>
    </>
  )
}

export default Conversation