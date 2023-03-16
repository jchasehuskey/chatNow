import React from 'react';
import { View, Text, Button, StyleSheet, Platform, KeyboardAvoidingView,} from 'react-native';
// import { GiftedChat ,Bubble} from 'react-native-gifted-chat';




export default class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
          name: "", 
          color:'', 
          messages:[], 
          user:{}
        };

    }


 


    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: 'orangered'
            }
          }}
        />
      )
    }




  render() {
    let color = this.props.route.params.color;
    let name=this.props.route.params.name; //passes name from Screen1
    this.props.navigation.setOptions({title:name});
    return (
      <View style={[styles.container, { backgroundColor: color }]}>
          {/* <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.state.user._id,
            }}
          /> */}
          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
          }
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: 'center',
    // justifyContent: 'center'
  }
});