import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import Chat from './components/chat';
import Start from './components/start';

// import Firebase and Firestore packages
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// initialize Firebase with your project's credentials
const firebaseConfig = {
  apiKey: "AIzaSyAVZ3KW3_LDCZ72VM74K9xieuo7fNR39qA",
  authDomain: "chatnow-82382.firebaseapp.com",
  projectId: "chatnow-82382",
  storageBucket: "chatnow-82382.appspot.com",
  messagingSenderId: "167868473092",
  appId: "1:167868473092:web:c75acb2cb682e75d4eba51"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Create a reference to Firestore database
const db = firebase.firestore();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
          // pass the database object to the Start component
          initialParams={{ db: db }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          // pass the database object to the Chat component
          initialParams={{ db: db }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;






// import { StatusBar } from 'expo-status-bar';
// import { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
// import Chat from './components/chat';
// import Start from './components/start';

// // import react Navigation
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Create the navigator
// const Stack = createNativeStackNavigator();


// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Start"
//       >
//         <Stack.Screen
//           name="Start"
//           component={Start}
//         />
//         <Stack.Screen
//           name="Chat"
//           component={Chat}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;