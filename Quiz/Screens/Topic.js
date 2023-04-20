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

const Topic = () => {
  return (
    <View style={styles.main}>
      <LinearGradient
        colors={['#7B6847', '#fff']}
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(100),
          //   borderBottomRightRadius: 30,
          //   borderBottomLeftRadius: 30,
        }}>
        <View style={styles.topicView}>
          <Text style={styles.topic} allowFontScaling={false}>
            HTML
          </Text>
          <Text style={styles.topic} allowFontScaling={false}>
            HTML
          </Text>
          <Text style={styles.topic} allowFontScaling={false}>
            HTML
          </Text>
          <Text style={styles.topic} allowFontScaling={false}>
            HTML
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Topic;

const styles = StyleSheet.create({
  main: {
    height: deviceheight,
    width: devicewidth,
    backgroundColor: 'white',
  },
  topicView: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  topic: {
    // marginVertical:responsiveHeight(1),
    width: responsiveWidth(90),
    height: responsiveHeight(7),
    backgroundColor: 'white',
    color: '#7B6847',
    marginVertical: responsiveHeight(1.5),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: responsiveFontSize(2.75),
    borderRadius: 20,
  fontWeight:500
  },
});
