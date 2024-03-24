import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ChatComponent = ({message, senderUsername, contactUsername}) => {
  const isSentByUser = senderUsername === contactUsername;
  return (
    <View
      style={[
        styles.container,
        {
          display: 'flex',
          alignItems: isSentByUser ? 'flex-start' : 'flex-end',
        },
      ]}>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 5,
    minWidth: '40%',
    borderColor: 'rgba(102, 91, 167, 0.2)',
    borderWidth: 1,
    backgroundColor: 'rgba(102, 91, 167, 0.8)',
  },
  messageText: {
    color: 'white',
  },
});

export default ChatComponent;
