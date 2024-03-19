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

const HomePage = ({navigation}) => {
  const [modaloption, setModalOption] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setModalOption(false);
    });
    return unsubscribe;
  }, [navigation]);

  const handleOpenModalOption = () => {
    setModalOption(!modaloption);
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
            <Text style={styles.usernameText}>Name User</Text>
          </View>

          <TouchableOpacity onPress={() => handleOpenModalOption()}>
            <Icon name="caret-down" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.contactContainer}>
            <View style={styles.profileContactContainer}>
              <Image
                style={styles.imageProfileContact}
                source={require('../assets/images/default-logo.png')}
              />
              <Text style={styles.usernameText}>Name User</Text>
            </View>

            <Icon name="circle" size={24} color="green" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactContainer}>
            <View style={styles.profileContactContainer}>
              <Image
                style={styles.imageProfileContact}
                source={require('../assets/images/default-logo.png')}
              />
              <Text style={styles.usernameText}>Name User</Text>
            </View>

            <Icon name="circle" size={24} color="green" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactContainer}>
            <View style={styles.profileContactContainer}>
              <Image
                style={styles.imageProfileContact}
                source={require('../assets/images/default-logo.png')}
              />
              <Text style={styles.usernameText}>Name User</Text>
            </View>

            <Icon name="circle" size={24} color="green" />
          </TouchableOpacity>
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
            onPress={() => navigation.navigate('Login')}
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
    backgroundColor: '#ffffff',
    margin: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
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
  },
  optionSelect: {
    marginBottom: 10,
  },
  optionSelectText: {
    fontSize: 15,
  },
});

export default HomePage;
