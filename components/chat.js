import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { GiftedChat, Bubble, InputToolbar} from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000",
        },
        left: {
          backgroundColor: "#FFF",
        },
      }}
    />
  );
};



export default function Chat({ navigation, route, db, isConnected ,storage }) {
  const { userID } = route.params;
  const [messages, setMessages] = useState([]);
  
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

  let unsubMessages;

  useEffect(() => {
        if (isConnected === true){

              // unregister current onSnapshot() listener to avoid registering multiple listeners when
                // useEffect code is re-executed.
          if (unsubMessages) unsubMessages();
             unsubMessages = null;
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q,(documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach((doc) => {
                const data = doc.data();
                const createdAt = data.createdAt.toDate(); // Convert Firestore timestamp to JS date object
                newMessages.push({
                _id: doc.id,
                text: data.text,
                createdAt: createdAt,
                user: data.user,
                });
            });
            cacheMessages(newMessages);
            setMessages(newMessages);
            });
        } else  loadCachedMessages();
        console.log('cachedmessages should be loading');
        console.log('currently offline');

         // Clean up code
     return () => {
        if (unsubMessages) unsubMessages();
      }
  }, [db],[isConnected]);

  const cacheMessages=async(messagesToCache) =>{
    try{
        await AsyncStorage.setItem('messages',JSON.stringify(messagesToCache));
    }catch(error){
        console.log(error.message);
    }
  }

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages");
    if (cachedMessages !== null) {
      setMessages(JSON.parse(cachedMessages));
    }
  };
  

//   const loadCachedMessages = async () => {
//     const cachedMessages = await AsyncStorage.getItem("messages") || [];
//     setMessages(JSON.parse(cachedMessages));
//   }

  useEffect(() => {
    // Retrieve the name and color values from the navigation prop
    const name = route.params.name;
    const color = route.params.color;

    // Set the header title to the name value
    navigation.setOptions({ title: name });

    // Set the header background color to the color value
    navigation.setOptions({
      headerStyle: {
        backgroundColor: color,
      },
    });
  }, [route.params.name, route.params.color]);

  const addMessage = (newMessage) => {
    addDoc(collection(db, "messages"), newMessage)
      .then(() => {
        console.log("Message added to Firestore");
      })
      .catch((error) => {
        console.error("Error adding message to Firestore: ", error);
      });
  };

  const onSend = (newMessages) => {
    const message = newMessages[0];
    const newMessage = {
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || "",
      user: {
        _id: userID,
        name: route.params.name,
      },
      image: message.image || null,
      location: message.location || null,
    };
    addMessage(newMessage);
  };


const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }





<GiftedChat
  messages={messages}
  renderBubble={renderBubble}
  renderInputToolbar={renderInputToolbar}
  renderActions={renderCustomActions}
  onSend={onSend}
  user={{ _id: userID, name: route.params.name }}
/>



  return (
    <View
      style={[styles.container, { backgroundColor: route.params.color }]}
    >
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={onSend}
        user={{ _id: userID, name: route.params.name }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
      <Button
        title="Leave Chat"
        onPress={() => navigation.navigate("Start")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
