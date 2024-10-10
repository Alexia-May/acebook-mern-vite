
export function Button(props) {

  return (
    <>
    <button onClick={props.handleClick}>{props.buttonText}</button>
    </>
  )
}