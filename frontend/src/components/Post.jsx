function Post(props) {

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
    const year = date.getFullYear().toString().slice(2)
    return `${hour}:${minutes}${meridium} - ${day}.${month}.${year}`;
  };

  return (
    <article key={props.id}>
      <div>
      <h2 data-testid="username">{props.username}</h2>
      <h2 data-testid="dateCreated">{getDateString(props.dateCreated)}</h2>
      </div>
      <p data-testid="message">{props.message}</p>
      <div data-testid="numberOfLikes">{props.noOfLikes}</div>
    </article>
  );
}

export default Post;
