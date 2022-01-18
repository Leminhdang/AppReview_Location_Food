import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {windowHeight} from '../../../components';
import {AuthContext} from '../../../Provider/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../../../assets/color';
import {categoryData} from '../categoriesData';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#ffaa3cd9', '#ffaa3cf2']}
      style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.textHello}>Xin chào</Text>
          {user?.token && <Text style={styles.textHello}>{user.fullname}</Text>}
        </View>
        <View style={styles.avatar}>
          {user?.token ? (
            <FastImage
              source={{
                uri: user.avatar,
              }}
              style={styles.image}
            />
          ) : (
            <Ionicons
              name="person-outline"
              size={22}
              onPress={() => navigation.navigate('Login')}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeSearch')}
        activeOpacity={1}
        style={styles.search}>
        <Ionicons name="search-outline" size={25} />
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Tìm kiếm"
        />
      </TouchableOpacity>
      <View style={styles.categories}>
        {categoryData.map((item, key) => (
          <TouchableOpacity key={key} style={styles.buttonContainer} activeOpacity={1}>
            <TouchableOpacity
              key={key}
              style={styles.buttonContainer}
              onPress={() =>
                navigation.navigate('CategoryHashTagScreen', {
                  title: item.title,
                })
              }>
              <FastImage source={item.image} style={styles.categoryButton} />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    height: windowHeight / 3.2,
    width: '100%',
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textHello: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 18,
    color: COLOR.WHITE,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: COLOR.WHITE,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  search: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.WHITE,
    justifyContent: 'space-between',
    borderRadius: 5,
    marginTop: 16,
  },
  input: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
    width: '90%',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  categoryButton: {
    width: 45,
    height: 45,
  },
  title: {
    fontFamily: 'BeVietnam-Medium',
    color: COLOR.WHITE,
    fontSize: 14,
    marginTop: 3,
  },
});

export default Header;
