import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
// import { ActionSheetProvider } from '@expo/react-native-action-sheet'; //for android
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";



const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage , userID}) => {

    const actionSheet = useActionSheet();

    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
          // function showActionSheets with Option, will initialize and show the ActionSheet
        actionSheet.showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
          },
          async (buttonIndex) => {
            switch (buttonIndex) {
              case 0:
                pickImage();
                return;
              case 1:
                takePhoto();
                return;
              case 2:
                getLocation();
                return;
              default:
                return;
            }
          },
        );
      };



      // Upload image to Firebase storage and send it
  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    });
  };

       

      // Pick image from media library
  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync();
      if (!canceled) await uploadAndSendImage(assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  


      // Take photo using camera
  const takePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (granted) {
      const { assets, canceled } = await ImagePicker.launchCameraAsync();
      if (!canceled) await uploadAndSendImage(assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };




      // Get current location
  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        const { longitude, latitude } = location.coords;
        onSend({
          location: {
            longitude,
            latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };



    const generateReference = (uri) => {
        const timeStamp = new Date().getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${imageName}`;
      };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CustomActions;

const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 10,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
  });