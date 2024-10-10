import avatar1 from '../assets/userAvatars/1.svg';
import avatar2 from '../assets/userAvatars/2.svg';
import avatar3 from '../assets/userAvatars/3.svg';
import avatar4 from '../assets/userAvatars/4.svg';
import avatar5 from '../assets/userAvatars/5.svg';
import avatar6 from '../assets/userAvatars/6.svg';


const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

// Function to get a random avatar
export const getRandomAvatar = () => {
    //const avatarCount = 6; // The number of available avatar images
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
};