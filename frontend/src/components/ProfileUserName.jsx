
const ProfileUserName = ({ username }) => {
    return (
      <div>
        <h1 data-testid="profile-heading">{`Welcome to your profile`}</h1>
        <h1 data-testid="profile-username-heading">{username}</h1>
    </div>
    );
  };
  
  export default ProfileUserName;