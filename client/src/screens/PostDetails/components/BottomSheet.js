import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {API_HOST, API_KEY} from '@env';
import React, {useState, useContext} from 'react';
import {COLOR} from '../../../assets/color';
import axios from 'axios';
import {AuthContext} from '../../../Provider/AuthProvider';
const BottomSheet = ({
  actionSheetRef,
  closeBottomSheet,
  navigation,
  user_id,
  statusSave,
  updateStatus,
  location,
  detail,
}) => {
  const { user } = useContext(AuthContext);
  const savePost = () => {
    axios({
      method: 'POST',
      url: `${API_HOST}post/savePost`,
      data: {
        post_id: detail.id,
        user_id: user?.id,
      },
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        if (response.data?.success) {
          ToastAndroid.show('Đã lưu bài viết', ToastAndroid.SHORT);
          updateStatus();
        } else {
          ToastAndroid.show(
            'Lưu thất bại vui lòng thử lại sau',
            ToastAndroid.SHORT,
          );
        }
      })
      .catch(err => console.log(err));
  };
  const deletePost = () => {
    axios({
      method: 'POST',
      url: `${API_HOST}post/deletePosts`,
      data: {
        id: detail.id,
      },
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        if (response.data?.success) {
          ToastAndroid.show('Xoá bài viết thành công', ToastAndroid.SHORT);
          navigation.goBack();
        } else {
          ToastAndroid.show(
            'Xoá bài viết thất bại vui lòng thử lại sau',
            ToastAndroid.SHORT,
          );
        }
      })
      .catch(err => console.log(err));
  };
  const deletePostSave = () => {
    axios({
      method: 'POST',
      url: `${API_HOST}post/deletePostSave`,
      data: {
        post_id: detail.id,
        user_id: user?.id,
      },
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        if (response.data?.success) {
          ToastAndroid.show('Huỷ lưu bài viết thành công', ToastAndroid.SHORT);
          updateStatus();
        } else {
          ToastAndroid.show(
            'Huỷ lưu thất bại vui lòng thử lại sau',
            ToastAndroid.SHORT,
          );
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.bottomSheetContainer}
      overlayColor="rgba(0, 0, 0, 0.7)"
      elevation={0}
      defaultOverlayOpacity={1}>
      <View style={styles.body}>
        {user_id === user?.id ? (
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => {
                navigation.navigate('EditPost', {
                  post_id: detail.id,
                  location_id: detail.location_id,
                });
                closeBottomSheet();
              }}>
              <Text style={[styles.label, styles.line]}>
                Chỉnh sửa bài viết bài viết
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => {
                deletePost();
                closeBottomSheet();
              }}>
              <Text style={[styles.label, styles.line]}>Xoá bài viết</Text>
            </TouchableOpacity>
          </View>
        ) : statusSave === false ? (
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => {
                deletePostSave();
                closeBottomSheet();
              }}>
              <Text style={[styles.label, styles.line]}>Bỏ lưu bài viết</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() =>
                navigation.navigate('Report', {
                  post_id: detail.id,
                  receiver_id: user_id,
                })
              }>
              <Text style={[styles.label]}>Báo cáo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => {
                savePost();
                closeBottomSheet();
              }}>
              <Text style={[styles.label, styles.line]}>Lưu bài viết</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() =>
                navigation.navigate('Report', {
                  post_id: detail.id,
                  receiver_id: user_id,
                })
              }>
              <Text style={[styles.label]}>Báo cáo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={[styles.body, {marginTop: 12}]}
        onPress={() => {
          closeBottomSheet();
        }}>
        <Text style={[styles.label]}>Huỷ</Text>
      </TouchableOpacity>
    </ActionSheet>
  );
};
const styles = StyleSheet.create({
  bottomSheetContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingHorizontal: 32,
  },
  label: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
    paddingVertical: 5,
  },
  color: {
    color: 'red',
  },
  bottomSheetContainer: {
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  body: {
    backgroundColor: COLOR.WHITE,
    borderRadius: 12,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: 'BeVietnam-Medium',
    lineHeight: 60,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.GREY,
  },
});

export default React.memo(BottomSheet);
