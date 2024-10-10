// import React from 'react';

const UserInfo = ({ firstName, lastName, birthday }) => {
    const formatBirthday = (birthdayString) => {
        if (!birthdayString) return 'Not available';
        
        const date = new Date(birthdayString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        
        return `Wish them Happy Birthday on... ${day} ${month}`;
      };
    
      const formattedBirthday = formatBirthday(birthday);

  return (
    <div>
      <h2 data-testid="firstLast">{firstName} {lastName}</h2>
      <p data-testid="birthday">{formattedBirthday}</p>
      </div>
  );
};

export default UserInfo;

