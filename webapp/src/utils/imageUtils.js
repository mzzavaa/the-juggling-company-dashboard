import practice1 from '../assets/practice1.png';
import practice2 from '../assets/practice2.png';
import practice3 from '../assets/practice3.png';
import jugglingAndBrain from '../assets/jugglingandyourbrain.png';
import jugglingAndChange from '../assets/jugglingandchange.png';
import jugglingAndTechnology from '../assets/jugglingandtechnology.png';

// Create an array of available images
export const availableImages = [
  practice1, practice2, practice3,
  jugglingAndBrain, jugglingAndChange, jugglingAndTechnology
];

// Function to get a random image from assets
export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  return availableImages[randomIndex];
};

// Function to get a random image for a specific category
export const getRandomImageForCategory = (category) => {
  let filteredImages = availableImages;
  
  // Filter images based on category if needed
  if (category === 'practice') {
    filteredImages = [practice1, practice2, practice3];
  } else if (category === 'news') {
    filteredImages = [jugglingAndBrain, jugglingAndChange, jugglingAndTechnology];
  }
  
  const randomIndex = Math.floor(Math.random() * filteredImages.length);
  return filteredImages[randomIndex];
};

// Map of image keys to imported images
export const imageMap = {
  practice1,
  practice2,
  practice3,
  jugglingAndBrain,
  jugglingAndChange,
  jugglingAndTechnology
};

export default {
  availableImages,
  getRandomImage,
  getRandomImageForCategory,
  imageMap
};
