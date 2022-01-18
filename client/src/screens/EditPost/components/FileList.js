import React from 'react';
import {Image, ScrollView, TouchableOpacity, View, Text} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import styles from '../style';

const FileList = ({fileList, openImagePicker, openVideoPicker, deleteItem}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{flexDirection: 'row'}}
      horizontal={true}>
      {fileList.map(item => (
        <View key={item.id}>
          {item.thumbnail ? (
            <Image source={{uri: item.thumbnail}} style={styles.image} />
          ) : (
            <Image source={{uri: item.path}} style={styles.image} />
          )}
          <IonIcon
            name="close"
            style={styles.icons}
            size={20}
            onPress={() => deleteItem(item.id)}
            color="#fff"
          />
        </View>
      ))}
      <TouchableOpacity
        style={[styles.picker, styles.image]}
        onPress={openImagePicker}
        activeOpacity={1}>
        <IonIcon name="image-outline" size={30} />
        <Text style={styles.label}>Thêm ảnh</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.picker, styles.image]}
        activeOpacity={1}
        onPress={openVideoPicker}>
        <IonIcon name="videocam-outline" size={30} />
        <Text style={styles.label}>Thêm video</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FileList;
