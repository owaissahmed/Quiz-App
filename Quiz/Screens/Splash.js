import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {React, useState, useEffect} from 'react';
import Questions from './Questions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

const Splash = ({navigation}) => {
  useEffect(() => {
    gotoQuiz();
  }, []);
  function gotoQuiz() {
    setTimeout(() => {
      navigation.navigate('Quiz');
    }, 3000);
  }

  return (
    <View style={styles.main}>
      <LinearGradient
        colors={['#fff', '#7B6847', '#fff']}
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(100),
          //   borderBottomRightRadius: 30,
          //   borderBottomLeftRadius: 30,
        }}>
        <View style={styles.imageView}>
          <Animatable.Image
            animation={'zoomIn'}
            duration={2000}
            style={styles.pic}
            source={require('../quizzler-bg-white.png')}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  main: {
    height: deviceheight,
    width: devicewidth,
    backgroundColor: 'white',
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    width: responsiveWidth(95),
    height: responsiveHeight(20),
  },
});
