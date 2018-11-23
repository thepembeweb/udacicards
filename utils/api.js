import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const UDACICARDS_STORAGE_KEY = 'UdaciCards:deck';
const NOTIFICATION_KEY = 'UdaciCards:quizNotification';

const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces.'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  Android: {
    title: 'Android',
    questions: [
      {
        question: 'What is Android?',
        answer: 'Android is a mobile operating system.'
      },
      {
        question: 'What\'s the current version of Android?',
        answer: 'Android P (Pie)'
      },
      {
        question: 'Which company owns Android OS?',
        answer: 'Google'
      },
      {
        question:
          'Which Android component you use to perform operations in background?',
        answer: 'Service'
      },
      {
        question:
          'Whats the name of declarative language which you can use to write Android Apps and its now backed by Google?',
        answer: 'Kotlin'
      }
    ]
  }
};

function setInitialData() {
  AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
}

function clearAsyncStorage() {
  AsyncStorage.clear();
}

function formatDeckResults(decks) {
  return decks === null ? setInitialData() : JSON.parse(decks);
}

export function fetchExistingDecks() {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(formatDeckResults);
}

export function addDeckToStorage({ deck, key }) {
  return AsyncStorage.mergeItem(
    UDACICARDS_STORAGE_KEY,
    JSON.stringify({ [key]: deck })
  );
}

export function addCardToDeckStorage({ cardInfo }) {
  return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(
    formatDeckResults => {
      const decks = JSON.parse(formatDeckResults);
      const { deckId, question, answer } = cardInfo;
      const deck = decks[deckId];
      deck.questions = deck.questions.concat({ question, answer });
      AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks));
    }
  );
}

export function clearQuizNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}

function createQuizNotification() {
  return {
    title: 'Take a challenge!',
    body: 'Don\'t forget to learn today, complete at least one quiz.',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export function setQuizLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(18);
            tomorrow.setMinutes(0);
            Notifications.scheduleLocalNotificationAsync(
              createQuizNotification(),
              {
                time: tomorrow,
                repeat: 'day'
              }
            );
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
