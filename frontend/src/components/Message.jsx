function Message(props) {
  return (
    <>
    <div>{props.sender}: {props.message}</div>
    <div>{props.date}</div>
    </>
  )
}

export default Message