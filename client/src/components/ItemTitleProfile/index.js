import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
import {windowWidth, windowHeight} from '../../components';
import {COLOR} from '../../assets/color';
import numberProcessing from '../../helpers/numberProcessing';
import Feather from 'react-native-vector-icons/Feather';
const ItemTiles = content => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={{flex: 1, fontFamily: 'BeVietnam-Regular', fontSize: 14}}>
          {content.content?.title}
        </Text>
        <Text style={styles.itemTitleNumber}>
          {content.content.number
            ? numberProcessing(content.content?.number)
            : numberProcessing(0)}
        </Text>
      </View>
    </View>
  );
};
const index = props => {
  const {dataProfile, dataCount, navigation} = props;

  return (
    <View style={{flex: 3, marginTop: 8}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flex: 2.5,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
          }}>
          <Avatar
            size={windowWidth * 0.35}
            rounded
            containerStyle={{
              borderRadius: 80,
              borderWidth: 1,
              padding: 8,
              borderColor: COLOR.YELLOW,
            }}
            activeOpacity={1}
            source={{uri: dataProfile[0]?.avatar}}
          />
        </View>
        <View style={{flex: 3.5}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View
              style={{
                flex: 1.5,
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  flex: 4,
                  justifyContent: 'center',
                }}>
                <Text style={styles.textName}>{dataProfile[0]?.fullname}</Text>
              </View>

              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                }}>
                <Button
                  icon={<Feather name="edit" size={16} color={COLOR.BLACK} />}
                  buttonStyle={styles.buttonEdit}
                  onPress={() => navigation.navigate('EditProfile')}
                />
              </View>
            </View>
            <View style={styles.viewLevel}>
              <Button
                buttonStyle={styles.buttonLevel}
                titleStyle={styles.titleButton}
                title={'Cấp độ ' + dataProfile[0]?.level}
                onPress={() => navigation.navigate('Member')}
              />
            </View>

            <View
              style={{
                flex: 2,
                flexDirection: 'row',
              }}>
              <ItemTiles
                content={{
                  title: 'Theo dõi',
                  number: dataCount[0]?.number_of_follower,
                }}
              />
              <ItemTiles
                content={{
                  title: 'Bài viết',
                  number: dataCount[1]?.number_of_posts,
                }}
              />
              <ItemTiles
                content={{
                  title: 'Hình ảnh',
                  number: dataCount[2]?.number_of_image,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(index);

const styles = StyleSheet.create({
  textName: {
    fontFamily: 'BeVietnam-ExtraBold',
    fontSize: 22,
  },
  infoView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  viewLevel: {
    flex: 1.5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  buttonEdit: {
    width: windowWidth / 13,
    height: windowHeight / 25,
    backgroundColor: '#fff',
    marginLeft: 16,
  },
  itemTitleNumber: {
    flex: 2,
    marginLeft: 16,
    fontFamily: 'BeVietnam-Bold',
    fontSize: 18,
  },
  buttonLevel: {
    backgroundColor: '#FBA83C',
    paddingHorizontal: 16,
  },
  titleButton: {
    fontFamily: 'BeVietnam-Bold',
    fontSize: 12,
    color: COLOR.BLACK,
  },
  infoText: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 14,
  },
});
