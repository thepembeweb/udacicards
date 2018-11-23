import {
  CARD,
  CARDS,
  DEFAULT_IMAGE_SIZE,
  FIXED_BAR_WIDTH,
  IMAGES_HOST_URL,
  SLIDER_INDICATOR_SPACER,
} from '../constants/Helpers'; 

const IMAGES = {
  answer: require('../assets/answer.jpg'),
  banner1: require('../assets/banner1.jpg'),
  banner2: require('../assets/banner2.jpg'),
  banner3: require('../assets/banner3.jpg'),
  banner4: require('../assets/banner4.jpg'),
  cover: require('../assets/cover.jpg'),
  home: require('../assets/home.jpg'),
  question: require('../assets/question.jpg'),
  quizError: require('../assets/quizError.jpg'),
  quizSuccess: require('../assets/quizSuccess.jpg'),
}

export function getImage(key){
  return IMAGES[key];   
}

export function getRandomImage(){

  const randomImageKeys = [
    'banner1',
    'banner2',
    'banner3',
    'banner4',
  ]; 

  const randomIndex = Math.floor(Math.random() * randomImageKeys.length); 
  const randomKey = randomImageKeys[randomIndex];
  return getImage(randomKey); 
}

export function getImageByIndex(index){
  const imageKeys = [
    'banner1',
    'banner2',
    'banner3',
    'banner4',
  ]; 

  const imageKeyIndex = getIndexByModulus(index, imageKeys.length); 
  const imageKey = imageKeys[imageKeyIndex];
  return getImage(imageKey); 
}

function getIndexByModulus(index, arrLength){
	return index % arrLength;
}

function getFormattedRandomImageUrl(imageSize, randomNumber) {
  return `${IMAGES_HOST_URL}/${imageSize}?sig=${randomNumber}`;
}

export function getRandomImageUrlByCustomIndex(customIndex) {
  return getFormattedRandomImageUrl(DEFAULT_IMAGE_SIZE, `${customIndex}`);
}

export function getSliderItemWidth(itemArray) {
  const numberOfItems =  itemArray.length;
  return FIXED_BAR_WIDTH / numberOfItems - (numberOfItems - 1) * SLIDER_INDICATOR_SPACER;
}

export function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

export function getCardsDescription(cards) {
  if (cards === 1) {
    return `${cards} ${CARD}`;
  } else {
    return `${cards} ${CARDS}`;
  }
}

export function getResultCardsDescription(correctCards, totalCards) {
  if (correctCards === totalCards) {
    return `You totally aced ${correctCards}/${getCardsDescription(totalCards)}!`; 
  } else {
    return `${correctCards}/${getCardsDescription(totalCards)} correct`;
  }
}

function getPercentage(number, total) {
  return Math.floor((number / total) * 100);
}

function formatPercentage(percentage) {
  return `${Math.round(percentage)}%`;
}

export function getPercentageDescription(number, total) {
  return formatPercentage(getPercentage(number, total));
}

export function hasPassedQuiz(correctAnswers, totalQuestions) {
  const score = getPercentage(correctAnswers, totalQuestions);
  return score === 100;
}