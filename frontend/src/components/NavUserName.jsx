
const NavUserName = ({ username, firstName, lastName }) => {
    return (
      <div>
        <p><b>{username} {firstName} {lastName}</b></p>
        {/* <p><b>{username}</b></p> */}
        </div>
    );
  };
  
  export default NavUserName;