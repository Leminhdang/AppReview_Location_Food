import React, {useRef, useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView, LogBox} from 'react-native';
import axios from 'axios';
import {HeaderComponent} from '../../components';
import RenderItem from './RenderItem';
import {API_HOST, API_KEY} from '@env';
import {COLOR} from '../../assets/color';

LogBox.ignoreAllLogs();
const VideoScreen = () => {
  const [dataVideo, setDataVideo] = useState([]);
  useEffect(() => {
    axios({
      method: 'POST',
      url: API_HOST + 'post/getVideoByPosts',
      timeout: 5000,
      headers: {
        Key: API_KEY,
      },
    })
      .then(response => {
        setDataVideo(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log(API_HOST);
  console.log(dataVideo);

  const onViewRef = useRef(({viewableItems, changed}) => {
    setVisibleItem(viewableItems[0]?.index);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 100});
  const [visibleItem, setVisibleItem] = useState('');
  const Item = ({item, index}) => {
    return <RenderItem item={item} visibleItem={visibleItem} index={index} />;
  };
  return (
    <SafeAreaView style={{height: '100%', backgroundColor: COLOR.WHITE}}>
      <View>
        <HeaderComponent title="Video" />
        <FlatList
          style={{marginBottom: 100}}
          data={dataVideo}
          renderItem={({item, index}) => <Item item={item} index={index} />}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default VideoScreen;
