// Import the necessary modules
import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

// Function to customize the appearance of chat bubbles
const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#51A3DF",
        },
        left: {
          backgroundColor: "#E1E5E6",
        },
      }}
    />
  );
};

// Function to conditionally render the input toolbar based upon a users connection status
const renderInputToolbar = (isConnected) => (props) => {
  if (isConnected) return <InputToolbar {...props} />;
  else return null;
};

// Define the Chat component as the default export of the module
export default function Chat({ navigation, route, db, isConnected, storage }) {
  //State for storing chat messages
  const [messages, setMessages] = useState([]);
  const { name, userID } = route.params;

  useEffect(() => {
    // Retrieve the name and color values from the navigation prop
    let name = route.params.name;
    let color = route.params.color;

    // Set the header title to the name value
    navigation.setOptions({ title: name });

    // Set the header background color to the color value
    navigation.setOptions({
      headerStyle: {
        backgroundColor: color,
      },
    });

    // Fetching messages from Firebase if connected, otherwise from local storage
    if (isConnected) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          const fetchedMessage = doc.data();
          fetchedMessage.createdAt = new Date(
            fetchedMessage.createdAt.seconds * 1000
          );
          fetchedMessages.push(fetchedMessage);
        });

        try {
          await AsyncStorage.setItem(
            "messages",
            JSON.stringify(fetchedMessages)
          );
        } catch (error) {
          console.log(error);
        }

        setMessages(fetchedMessages);
      });

      // Unsubscribe from Firebase listener on component unmount
      return () => {
        unsubscribe();
      };
    } else {
      // Get cached messages from local storage
      AsyncStorage.getItem("messages").then((cachedMessages) => {
        if (cachedMessages !== null) {
          setMessages(JSON.parse(cachedMessages));
        }
      });
    }
  }, [navigation, route.params.name, route.params.color, db, isConnected]);

  // Function that adds a new message to the "messages" collection in Firestore when the user sends a message
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), {
      ...newMessages[0],
      createdAt: new Date(),
      user: {
        _id: route.params.userID,
        name: route.params.name,
        avatar: "https://placebear.com/140/140",
      },
    });
  };

  //Render custom actions for sending images, locations, etc...
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // Render custom view for displaying locations
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <View style={{ margin: 5, borderRadius: 13, overflow: "hidden" }}>
          <MapView
            style={{
              width: 150,
              height: 100,
            }}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: route.params.color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar(isConnected)}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name,
          avatar: "https://placebear.com/140/140",
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      <Button title="Leave Chat" onPress={() => navigation.navigate("Start")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});