import Chat from './components/chat';
import Start from './components/start';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVZ3KW3_LDCZ72VM74K9xieuo7fNR39qA",
  authDomain: "chatnow-82382.firebaseapp.com",
  projectId: "chatnow-82382",
  storageBucket: "chatnow-82382.appspot.com",
  messagingSenderId: "167868473092",
  appId: "1:167868473092:web:c75acb2cb682e75d4eba51"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat">
            {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

















