
import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TextInput, 
    StyleSheet, 
    ImageBackground, 
    TouchableOpacity 
} from 'react-native';

const backgroundColors = {
    black: { backgroundColor: '#000000'},
    grey: { backgroundColor: '#8a95a5'},
    purple: { backgroundColor: '#474056'},
    green: { backgroundColor: '#94ae89'}
}

export default class Start extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = { name: '', color: ''};
    }
    render () {
        const { black, grey, purple, green} = backgroundColors;
        return (
            <View style={styles.container}>
                <ImageBackground
                  source={require('../assets/background-img.png')}
                  style={[styles.container, styles.image]}
                >
                    
                  <Text style={styles.title} >Chat App</Text>

                  <View style={styles.inputBox} >
                     <TextInput
                       style={styles.nameBox}
                       onChangeText={(name) => this.setState({ name })}
                       value={this.state.name}
                       placeholder='Enter your Name'
                      />

                      <View>
                        <Text style={styles.colorSelector} >Choose your Background:</Text>
                        <View style={styles.colorWrapper}>
                            <TouchableOpacity 
                              style={[styles.color, 
                              black,
                              this.state.color === black.backgroundColor
                              ? styles.colorSelected
                              : {}
                            ]}
                              onPress={() =>
                              this.setState({ color: black.backgroundColor })
                              }
                            />

                            <TouchableOpacity style={[
                                styles.color, 
                                grey,
                                this.state.color === grey.backgroundColor
                                ? styles.colorSelected
                                : {}
                            ]}
                              onPress={() =>
                              this.setState({ color: grey.backgroundColor })
                              }
                            />

                            <TouchableOpacity style={[
                                styles.color, 
                                purple,
                                this.state.color === purple.backgroundColor
                                ? styles.colorSelected
                                : {}
                            ]}
                              onPress={() =>
                              this.setState({ color: purple.backgroundColor })
                              }
                            />

                            <TouchableOpacity style={[
                                styles.color,
                                green,
                                this.state.color === green.backgroundColor
                                ? styles.colorSelected
                                : {}
                            ]}
                              onPress={() =>
                              this.setState({ color: green.backgroundColor })
                              }
                            />
                        </View>
                      </View>
                      <TouchableOpacity
                        style={[styles.nameBox, styles.chatBox]}
                       // title='Go to Chat'
                        onPress={() => 
                        this.props.navigation.navigate('Chat', 
                        {
                             name: this.state.name, 
                             color: this.state.color
                        })
                        }
                        >
                            <Text style={[styles.colorSelector, styles.chatBoxText]} >
                                Start Chatting
                            </Text>
                        </TouchableOpacity>
                  </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        color: '#fff',
        fontSize: 50,
        fontWeight: '600',
        marginTop: 60
    },

    inputBox: {
        backgroundColor: '#fff',
        marginBottom: 15,
        height: '44%',
        width: '88%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20
    },

    nameBox: {
       height: 50,
       width: '88%',
       borderColor: 'grey',
       borderWidth: 1,
       borderRadius: 2,
       color: '#757083',
       opacity: 50,
       fontSize: 16,
       fontWeight: '300',
       paddingLeft: 10
    },

    colorSelector: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 100
    },

   colorWrapper: {
    flexDirection: 'row'
   },

   color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10
   },

    chatBox: {
        backgroundColor: '#757083',
        justifyContent: 'center'
    },

    chatBoxText: {
        color: '#fff',
        fontWeight: '300'
    },

    colorSelected: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#5f5f5f",
      },
})





















// import React from 'react';
// import { 
//     View, 
//     Text, 
//     Button, 
//     TextInput, 
//     StyleSheet, 
//     ImageBackground, 
//     TouchableOpacity 
// } from 'react-native';

// import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

// const backgroundColors = {
//     black: { backgroundColor: '#000000'},
//     grey: { backgroundColor: '#8a95a5'},
//     purple: { backgroundColor: '#474056'},
//     green: { backgroundColor: '#94ae89'}
// }

// export default class Start extends React.Component {
   
//     constructor(props) {
//         super(props);
//         this.state = { name: '', color: ''};

//         const auth = getAuth();

//         // In the onPress event handler of "Start Chatting", instead of navigating the user to Chat screen, call signInAnonymously() to log in the user.
//         const handlePress = () => {
//           signInAnonymously(auth)
//             .then((userCredential) => {
//               // navigate to the Chat screen while passing three route parameters: the user's id, user's name and the selected background color
//               this.props.navigation.navigate("Chat", {
//                 userId: userCredential.user.uid,
//                 name: this.state.name,
//                 color: this.state.color,
//               });
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         };
//     }
    
//     render () {
//         const { black, grey, purple, green} = backgroundColors;
//         const auth = getAuth();
//         const handlePress = () => {
//             signInAnonymously(auth)
//             .then((userCredential) => {
//               // navigate to the Chat screen while passing three route parameters: the user's id, user's name and the selected background color
//               this.props.navigation.navigate("Chat", {
//                 userId: userCredential.user.uid,
//                 name: this.state.name,
//                 color: this.state.color,
//               });
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         };
//         return (
//             <View style={styles.container}>
//                 <ImageBackground
//                   source={require('../assets/background-img.png')}
//                   style={[styles.container, styles.image]}
//                 >
                    
//                   <Text style={styles.title} >Chat App</Text>

//                   <View style={styles.inputBox} >
//                      <TextInput
//                        style={styles.nameBox}
//                        onChangeText={(name) => this.setState({ name })}
//                        value={this.state.name}
//                        placeholder='Enter your Name'
//                       />

//                       <View>
//                         <Text style={styles.colorSelector} >Choose your Background:</Text>
//                         <View style={styles.colorWrapper}>
//                             <TouchableOpacity 
//                               style={[styles.color, 
//                               black,
//                               this.state.color === black.backgroundColor
//                               ? styles.colorSelected
//                               : {}
//                             ]}
//                               onPress={() =>
//                               this.setState({ color: black.backgroundColor })
//                               }
//                             />

//                             <TouchableOpacity style={[
//                                 styles.color, 
//                                 grey,
//                                 this.state.color === grey.backgroundColor
//                                 ? styles.colorSelected
//                                 : {}
//                             ]}
//                               onPress={() =>
//                               this.setState({ color: grey.backgroundColor })
//                               }
//                             />

//                             <TouchableOpacity style={[
//                                 styles.color, 
//                                 purple,
//                                 this.state.color === purple.backgroundColor
//                                 ? styles.colorSelected
//                                 : {}
//                             ]}
//                               onPress={() =>
//                               this.setState({ color: purple.backgroundColor })
//                               }
//                             />

//                             <TouchableOpacity style={[
//                                 styles.color,
//                                 green,
//                                 this.state.color === green.backgroundColor
//                                 ? styles.colorSelected
//                                 : {}
//                             ]}
//                               onPress={() =>
//                               this.setState({ color: green.backgroundColor })
//                               }
//                             />
//                         </View>
//                       </View>
//                       <TouchableOpacity
//                         style={[styles.nameBox, styles.chatBox]}
//                        // title='Go to Chat'
//                         onPress={() => 
//                         this.props.navigation.navigate('Chat', 
//                         {
//                              name: this.state.name, 
//                              color: this.state.color
//                         })
//                         }
//                         >
//                             <Text style={[styles.colorSelector, styles.chatBoxText]} >
//                                 Start Chatting
//                             </Text>
//                         </TouchableOpacity>
//                   </View>
//                 </ImageBackground>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },

//     image: {
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//     },

//     title: {
//         color: '#fff',
//         fontSize: 50,
//         fontWeight: '600',
//         marginTop: 60
//     },

//     inputBox: {
//         backgroundColor: '#fff',
//         marginBottom: 15,
//         height: '44%',
//         width: '88%',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingVertical: 20
//     },

//     nameBox: {
//        height: 50,
//        width: '88%',
//        borderColor: 'grey',
//        borderWidth: 1,
//        borderRadius: 2,
//        color: '#757083',
//        opacity: 50,
//        fontSize: 16,
//        fontWeight: '300',
//        paddingLeft: 10
//     },

//     colorSelector: {
//         textAlign: 'center',
//         fontSize: 16,
//         fontWeight: '300',
//         color: '#757083',
//         opacity: 100
//     },

//    colorWrapper: {
//     flexDirection: 'row'
//    },

//    color: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     margin: 10
//    },

//     chatBox: {
//         backgroundColor: '#757083',
//         justifyContent: 'center'
//     },

//     chatBoxText: {
//         color: '#fff',
//         fontWeight: '300'
//     },

//     colorSelected: {
//         borderStyle: "solid",
//         borderWidth: 2,
//         borderColor: "#5f5f5f",
//       },
// })







