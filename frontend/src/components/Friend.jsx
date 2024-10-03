function Friend(props) {
    return <article key={props.user._id}>{props.user.email}</article>;
    }
    
    export default Friend;
    