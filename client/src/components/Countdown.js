import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

let clockCall = null;
const CountdownClock = () => {
  const [countdown, setCountdown] = useState(120);
  const [resendEnable, setResendEnable] = useState(false);
  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  const decrementClock = () => {
    if (countdown === 0) {
      setResendEnable(true);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };
  const resendOTP = () => {
    if (resendEnable) {
      setCountdown(120);
      setResendEnable(false);
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
    }
  };
  return (
    <View>
      {resendEnable ? (
        <Text onPress={() => resendOTP()} style={styles.text}>
          Gửi mã
        </Text>
      ) : (
        <Text style={styles.text}>Mã sẽ hết hạn sau {countdown}s</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: 'BeVietnam-Medium',
    fontSize: 16,
  },
});

export default React.memo(CountdownClock);
