// Function to get a random avatar
export const getRandomAvatar = () => {
    const avatarCount = 6; // The number of available avatar images
    const randomIndex = Math.floor(Math.random() * avatarCount) + 1;
    return `src/assets/userAvatars/${randomIndex}.svg`; 
};