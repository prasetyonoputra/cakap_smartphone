import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Button,
} from 'react-native';

const RegisterPage = ({navigation}) => {
  const [imageProfile, setImageProfile] = useState();

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response) {
        setImageProfile(response);
      }
    });
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo.png')}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelForm}>Nama Depan</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Masukan Nama Depan"
              placeholderTextColor={'gray'}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelForm}>Nama Belakang</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Masukan Nama Belakang"
              placeholderTextColor={'gray'}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelForm}>Email</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Masukan Email"
              placeholderTextColor={'gray'}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelForm}>Username</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Masukan Username"
              placeholderTextColor={'gray'}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelForm}>Password</Text>
            <TextInput
              style={styles.inputText}
              secureTextEntry={true}
              placeholder="Masukan Password"
              placeholderTextColor={'gray'}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.loginText}>
            Sudah punya akun?{' '}
            <Text onPress={e => navigation.navigate('Login')}>Login</Text>
          </Text>
        </View>
      </ScrollView>

      <View style={styles.copyRightContainer}>
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
  loginText: {
    marginBottom: 40,
    color: 'black',
  },
  copyRightText: {
    fontWeight: 'bold',
    color: 'black',
  },
  copyRightContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default RegisterPage;
