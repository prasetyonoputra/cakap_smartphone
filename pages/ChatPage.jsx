import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactService from '../services/ContactService';
import ChatService from '../services/ChatService';
import ChatComponent from '../components/ChatComponent';
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://192.168.100.249:8000';

const ChatPage = ({navigation, route}) => {
  const [detailContact, setDetailContact] = useState({});
  const [listChat, setListChat] = useState([]);
  const [messageText, setMessageText] = useState('');

  const {sendJsonMessage, lastMessage, readyState, getWebSocket} = useWebSocket(
    WS_URL,
    {
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

        if (data.type === 'message') {
          console.log(data);
          setListChat(prevList => [...prevList, data.dataChat]);
        }
      },
      shouldReconnect: closeEvent => true,
    },
  );

  const handleSend = async () => {
    if (messageText === '') {
      return;
    }
    
    const token = await AsyncStorage.getItem('token');
    const socketId = await AsyncStorage.getItem('socketId');

    const data = {
      type: 'message',
      message: messageText,
      toUsername: route.params.userName,
      fromUsername: route.params.myUsername,
      token: token,
      socketId: socketId,
    };

    sendJsonMessage(data);
    setMessageText('');
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const fetchDetailContact = await ContactService.getDetailContact(
        token,
        route.params.userName,
      );

      const fetchListChat = await ChatService.getListChat(
        token,
        route.params.userName,
      );

      if (fetchDetailContact) {
        setDetailContact(fetchDetailContact.user);
        setListChat(fetchListChat.chats);
      }
    };

    fetchData();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.imageProfile}
            source={require('../assets/images/default-logo.png')}
          />

          <Text style={styles.contactName}>
            {`${detailContact.firstName} ${detailContact.lastName}`}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.chatContainer}>
        <View style={{paddingBottom: 50}}>
          {listChat.map((chat, index) => (
            <ChatComponent
              key={index}
              message={chat.message}
              senderUsername={chat.userSender.username}
              contactUsername={route.params.userName}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputMessage}
          placeholder="Masukan Pesan.."
          value={messageText}
          onChangeText={text => setMessageText(text)}
        />
        <TouchableOpacity onPress={handleSend}>
          <Icon
            style={styles.iconSend}
            name="send"
            size={30}
            color="rgba(102, 91, 167, 0.8)"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(102, 91, 167, 0.8)',
    padding: 12,
  },
  imageProfile: {
    borderRadius: 50,
    width: 60,
    height: 60,
    marginRight: 20,
  },
  contactName: {
    color: 'white',
    fontSize: 20,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
  },
  chatContainer: {
    marginTop: 85,
    padding: 20,
    marginBottom: 20,
    maxHeight: '82%',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputMessage: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(102, 91, 167, 0.2)',
    width: '80%',
    color: 'black',
  },
  iconSend: {
    marginRight: 10,
  },
});

export default ChatPage;
