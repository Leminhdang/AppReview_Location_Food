import * as React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import VoucherUsed from './VoucherUsed';
import Voucher from './Voucher';

const renderScene = SceneMap({
  voucher: Voucher,
  used_voucher: VoucherUsed,
});

const TabLayout = () => {
  const {width} = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'voucher', title: 'Voucher chưa sử dụng'},
    {key: 'used_voucher', title: 'Voucher đã sử dụng'},
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
