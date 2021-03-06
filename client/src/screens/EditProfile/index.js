import React, {createRef, useContext, useMemo, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  LogBox,
  Image,
  TextInput,
  Text,
  ToastAndroid,
} from 'react-native';

import {HeaderComponent} from '../../components';
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {useFormik} from 'formik';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Input from './components/Input';
import ActionSheet from 'react-native-actions-sheet';
import storage from '@react-native-firebase/storage';
import {updateProfileSchema} from '../../schema';
import createFileName from '../../helpers/createFileName';
import axios from 'axios';
import {API_HOST, API_KEY} from '@env';
import Spinner from 'react-native-loading-spinner-overlay';
import Picker from './components/Picker';
import {AuthContext} from '../../Provider/AuthProvider';
import FastImage from 'react-native-fast-image';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const actionSheetRef = createRef();

const EditProfile = ({navigation, route}) => {
  const {user, dispatch} = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const {id, fullname, phone_number, gender, coins, avatar} =
    route.params.profile;
  const [image, setImage] = useState(avatar);
  const [visible, setVisible] = useState(false);

  const {handleChange, setFieldValue, values, isValid} = useFormik({
    validationSchema: updateProfileSchema,
    initialValues: {id, fullname, phone_number, gender, coins},
  });
  const closeModal = prev => setVisible(!prev);
  const openBottomSheet = () => {
    actionSheetRef.current?.setModalVisible();
  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImage(image.path);
      closeBottomSheet();
    });
  };

  const takePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      closeBottomSheet();
      setImage(image.path);
    });
  };

  const closeBottomSheet = () => {
    actionSheetRef.current?.hide();
  };

  const update = data => {
    axios({
      method: 'POST',
      url: `${API_HOST}user/updateProfile`,
      timeout: 5000,
      data,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        if (response.data.success)
          dispatch({type: 'UPDATE_INFO', payload: response.data.data});
        {
          ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
          setLoading(false);
          navigation.goBack();
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        ToastAndroid.show('???? x???y ra l???i vui l??ng th??? l???i', ToastAndroid.SHORT);
      });
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      // Upload hinh len firebase + getDownloadURL
      if (image === avatar) {
        update({...values, avatar});
      } else {
        const fileName = createFileName();
        const state = await storage().ref(`Images/${fileName}`).putFile(image);
        if (state.state === 'success') {
          const url = await storage()
            .ref(`Images/${fileName}`)
            .getDownloadURL();
          update({...values, avatar: url});
        } else {
          ToastAndroid.show(
            '???? x???y ra l???i vui l??ng th??? l???i',
            ToastAndroid.SHORT,
          );
          setLoading(false);
        }
      }

      // Update profile
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      ToastAndroid.show('???? x???y ra l???i vui l??ng th??? l???i', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.container}>
      <HeaderComponent
        type={isValid}
        onPress={onSubmit}
        title="Th??ng tin c?? nh??n"
        left
        label="L??u"
        {...{navigation}}
      />
      <View style={{alignItems: 'center'}}>
        <View style={styles.avatarContainer}>
          <FastImage source={{uri: image}} style={styles.avatar} />
          <TouchableOpacity
            style={styles.icon}
            onPress={openBottomSheet}
            activeOpacity={0.5}>
            <IonIcon name="ios-camera-outline" size={18} />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 24}}>
          <View style={styles.formContainer}>
            <Input
              value={values.fullname}
              {...{handleChange}}
              name="fullname"
              placeholder="T??n ?????y ?????">
              <FontAwesome name="user-circle-o" size={20} />
            </Input>
            <Input
              value={values.phone_number}
              {...{handleChange}}
              name="phone_number"
              placeholder="S??? ??i???n tho???i">
              <MaterialCommunityIcons name="phone" size={20} />
            </Input>
            <Spinner
              visible={loading}
              cancelable
              overlayColor="transparent"
              color="#a6a6a6"
            />
            <Input
              value={values.gender}
              {...{handleChange}}
              name="gender"
              placeholder="Gi???i t??nh"
              enable
              onPress={() => closeModal(visible)}>
              <IonIcon name="woman" size={20} />
            </Input>
            <Input value={`${values.coins} xu`} enable>
              <FontAwesome5 name="coins" size={20} />
            </Input>
          </View>
        </View>
        <ActionSheet
          ref={actionSheetRef}
          containerStyle={styles.bottomSheetContainer}
          overlayColor="rgba(0, 0, 0, 0.7)"
          elevation={0}
          defaultOverlayOpacity={1}>
          <View style={styles.body}>
            <TouchableOpacity
              onPress={takePhotoFromCamera}
              style={{width: '100%'}}
              activeOpacity={1}>
              <Text style={[styles.label, styles.line]}>Ch???p ???nh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePhotoFromLibrary}
              style={{width: '100%'}}
              activeOpacity={1}>
              <Text style={[styles.label]}>Ch???n ???nh t??? th?? vi???n</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.body, {marginTop: 12}]}
            onPress={closeBottomSheet}>
            <Text style={[styles.label]}>Hu???</Text>
          </TouchableOpacity>
        </ActionSheet>
      </View>
      <Picker {...{visible, closeModal, setFieldValue}} />
    </View>
  );
};

export default EditProfile;
