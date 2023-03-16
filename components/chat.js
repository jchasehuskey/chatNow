import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

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

export default function Chat(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placebear.com/140/140",
        },
      },
      {
        _id: 2,
        text: "You've entered the chat",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  useEffect(() => {
    // Retrieve the name and color values from the navigation prop
    let name = props.route.params.name;
    let color = props.route.params.color;

    // Set the header title to the name value
    props.navigation.setOptions({ title: name });

    // Set the header background color to the color value
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: color,
      },
    });
  }, [props.route.params.name, props.route.params.color]);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: props.route.params.color }]}
    >
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ _id: 1 }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {/* optional for IOS */}
      {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
      <Button
        title="Leave Chat"
        onPress={() => props.navigation.navigate("Start")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});