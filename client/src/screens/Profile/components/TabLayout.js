import * as React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Posts from './Posts';
import PostsSave from './PostsSave';

const renderScene = SceneMap({
  posts: Posts,
  postsSave: PostsSave,
});

const TabLayout = () => {
  const {width} = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'posts', title: 'Bài viết của bạn'},
    {key: 'postsSave', title: 'Bài viết đã lưu'},
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'transparent'}}
      style={{backgroundColor: '#fff', elevation: 2}}
      labelStyle={{fontFamily: 'BeVietnam-Bold'}}
      activeColor="#000"
      inactiveColor="#969696"
    />
  );
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: width}}
      renderTabBar={renderTabBar}
    />
  );
};
export default React.memo(TabLayout);
