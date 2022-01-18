import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import VideoPlayer from 'react-native-video-controls';
import { COLOR } from '../../../assets/color';

const ImageFullScreen = ({ route }) => {
    const navigation = useNavigation();
    const { url, type } = route.params;
    return (
        <>
            {type === 'image' && (
                <View style={styles.container}>
                    <FastImage
                        source={{ uri: url }}
                        style={styles.image}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <AntDesign
                        name="closecircle"
                        size={30}
                        color="#FFF"
                        style={styles.icon}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            )}
            {type === 'video' && (
                <VideoPlayer
                    style={styles.video}
                    paused={true}
                    source={{
                        uri: url,
                    }}
                    repeat={false}
                    onBack={() => navigation.goBack()}
                />
            )}
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '90%',
    },
    icon: {
        position: 'absolute',
        right: 20,
        top: 10,
    },
    wrapVideo: {
        flex: 1,
        width: '100%',
    },

    video: {
        width: '100%',
        aspectRatio: 1 / 2,
        backgroundColor: COLOR.BLACK,
    },
});

export default ImageFullScreen;
