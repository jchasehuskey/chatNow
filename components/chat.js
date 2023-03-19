// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Button,
//   StyleSheet,
//   Platform,
//   KeyboardAvoidingView,
// } from "react-native";
// import { GiftedChat, Bubble } from "react-native-gifted-chat";
// import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";


// const renderBubble = (props) => {
//   return (
//     <Bubble
//       {...props}
//       wrapperStyle={{
//         right: {
//           backgroundColor: "#000",
//         },
//         left: {
//           backgroundColor: "#FFF",
//         },
//       }}
//     />
//   );
// };

// export default function Chat({ navigation, route, db }) {
//   const { userID } = route.params;
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
//     const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
//       let newMessages = [];
//       documentsSnapshot.forEach((doc) => {
//         const data = doc.data();
//         const createdAt = data.createdAt.toDate(); // Convert Firestore timestamp to JS date object
//         newMessages.push({
//           _id: doc.id,
//           text: data.text,
//           createdAt: createdAt,
//           user: data.user,
//         });
//       });
//       setMessages(newMessages);
//     });

//     // Clean up code
//     return () => {
//       unsubMessages();
//     };
//   }, [db]);

//   useEffect(() => {
//     // Retrieve the name and color values from the navigation prop
//     const name = route.params.name;
//     const color = route.params.color;

//     // Set the header title to the name value
//     navigation.setOptions({ title: name });

//     // Set the header background color to the color value
//     navigation.setOptions({
//       headerStyle: {
//         backgroundColor: color,
//       },
//     });
//   }, [route.params.name, route.params.color]);

//   const onSend = (newMessages) => {
//     addDoc(collection(db, "messages"), newMessages[0]);
//   };
  

//   return (
//     <View
//       style={[styles.container, { backgroundColor: route.params.color }]}
//     >
//       <GiftedChat
//         messages={messages}
//         renderBubble={renderBubble}
//         onSend={onSend}
//         user={{ _id: route.params.userID, name: route.params.name }}
//       />
//       {Platform.OS === "android" ? (
//         <KeyboardAvoidingView behavior="height" />
//       ) : null}
//       {Platform.OS === "ios" ? (
//         <KeyboardAvoidingView behavior="padding" />
//       ) : null}
//       <Button
//         title="Leave Chat"
//         onPress={() => navigation.navigate("Start")}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });





import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

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

export default function Chat({ navigation, route, db }) {
  const { userID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
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
      setMessages(newMessages);
    });

    // Clean up code
    return () => {
      unsubMessages();
    };
  }, [db]);

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

  return (
    <View
      style={[styles.container, { backgroundColor: route.params.color }]}
    >
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
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
