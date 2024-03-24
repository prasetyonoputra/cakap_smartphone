import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContactService from '../services/ContactService';
import UserService from '../services/UserService';
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://192.168.100.249:8000';

const HomePage = ({navigation}) => {
  const [modaloption, setModalOption] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [listContact, setListContact] = useState([]);

  const {
    sendJsonMessage,
    lastMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(WS_URL, {
    onOpen: event => {
      console.log('WebSocket connection established.');
    },
    onClose: () => {
      console.log('WebSocket connection closed.');
    },
    onError: event => {
      console.error('WebSocket error:', event);
    },
    onMessage: async rawData => {
      const data = JSON.parse(rawData.data);

      if (data.type === 'sendId') {
        console.log('User ID: ' + data.userId);
        await AsyncStorage.setItem('socketId', data.userId);
      }
    },
    shouldReconnect: closeEvent => true,
  });

  useEffect(() => {
    const hideElement = navigation.addListener('focus', () => {
      setModalOption(false);
    });
    return hideElement;
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        handleLogout();
      } else {
        const responseUserProfile = await UserService.getUserProfile(token);
        const responseListContact = await ContactService.getListContact(token);

        if (responseUserProfile === null || responseListContact === null) {
          handleLogout();
        }
        setUserProfile(responseUserProfile.user);
        setListContact(responseListContact.contacts);
      }
    };

    fetchData();
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token', () =>
      console.log('Success remove token!'),
    );

    await AsyncStorage.removeItem('socketId', () =>
      console.log('Success remove socket id!'),
    );

    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.imageProfile}
              source={require('../assets/images/default-logo.png')}
            />
            <View>
              <Text
                style={
                  styles.usernameText
                }>{`${userProfile.firstName} ${userProfile.lastName}`}</Text>
              <Text style={styles.statusText}>
                {userProfile.status ? userProfile.status : 'Offline'}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => setModalOption(!modaloption)}>
            <Icon name="caret-down" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          {listContact &&
            listContact.map(contact => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Chat', {
                    userName: contact.username,
                    myUsername: userProfile.username
                  })
                }
                style={styles.contactContainer}
                key={contact.username}>
                <View style={styles.profileContactContainer}>
                  <Image
                    style={styles.imageProfileContact}
                    source={require('../assets/images/default-logo.png')}
                  />
                  <Text style={styles.usernameText}>
                    {`${contact.firstName} ${contact.lastName}`}
                  </Text>
                </View>

                <Icon
                  name="circle"
                  size={24}
                  color={contact.status === 'Online' ? 'green' : 'red'}
                />
              </TouchableOpacity>
            ))}
        </View>
      </View>

      <View style={styles.navigationBar}>
        <TouchableOpacity>
          <Icon name="group" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="user-plus" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="call" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {modaloption && (
        <View style={styles.modalOption}>
          <TouchableOpacity style={styles.optionSelect}>
            <Text style={styles.optionSelectText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionSelect}>
            <Text style={styles.optionSelectText}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionSelect}>
            <Text style={styles.optionSelectText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLogout()}
            style={styles.optionSelect}>
            <Text style={styles.optionSelectText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: 'rgba(102, 91, 167, 0.2)',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  imageProfile: {
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  imageProfileContact: {
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  usernameText: {
    fontSize: 20,
    marginLeft: 15,
    color: 'black',
  },
  statusText: {
    fontSize: 15,
    marginLeft: 15,
    color: 'black',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileContactContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(102, 91, 167, 0.2)',
  },
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(102, 91, 167, 0.8)',
    height: 60,
  },
  modalOption: {
    position: 'absolute',
    top: 80,
    right: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderColor: 'rgba(102, 91, 167, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
  },
  optionSelect: {
    marginBottom: 10,
  },
  optionSelectText: {
    fontSize: 15,
    color: 'black',
  },
});

export default HomePage;
