import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

const maxRating = [1, 2, 3, 4, 5];
const Rating = ({setFieldValue, name}) => {
  const [rating, setRating] = useState(1);
  const starCorner = require('../assets/images/star_corner.png');
  const starFilled = require('../assets/images/star_filled.png');

  return (
    <View style={{flexDirection: 'row'}}>
      {maxRating.map(item => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={item}
          onPress={() => {
            setRating(item);
            setFieldValue(name, item);
          }}>
          <FastImage
            source={item <= rating ? starFilled : starCorner}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default React.memo(Rating);
