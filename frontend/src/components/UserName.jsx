// import React from 'react';

const UserName = ({ username }) => {
  return (
    <div>
      <h1 data-testid="username-heading">{`${username}'s Profile`}</h1>
      </div>
  );
};

export default UserName;

