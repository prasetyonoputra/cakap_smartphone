import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../services/AuthService';

const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const setElement = navigation.addListener('focus', () => {
      setUsername('');
      setPassword('');
    });
    return setElement;
  }, [navigation]);

  useEffect(() => {
    const getToken = async () => await AsyncStorage.getItem('token');

    if (getToken()) {
      navigation.navigate('Home');
    }
  }, [navigation]);

  const handleLogin = async () => {
    const response = await AuthService.login(username, password);

    if (response.token) {
      await AsyncStorage.setItem('token', response.token);
      navigation.navigate('Home');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.labelForm}>Username</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Masukan Username"
            placeholderTextColor="gray"
            onChangeText={text => setUsername(text)}
            value={username}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.labelForm}>Password</Text>
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            placeholder="Masukan Password"
            placeholderTextColor="gray"
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.registerText}>
          Belum punya akun?{' '}
          <Text onPress={() => navigation.navigate('Register')}>Daftar</Text>
        </Text>

        <Text style={styles.copyRightText}>© 2024 Cakap Messenger</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 10,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: 'white',
    color: 'black',
  },
  labelForm: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 15,
  },
  button: {
    borderRadius: 10,
    height: 45,
    backgroundColor: '#4a69bb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  registerText: {
    marginBottom: 40,
    color: 'black',
  },
  copyRightText: {
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
    color: 'black',
  },
});

export default LoginPage;
