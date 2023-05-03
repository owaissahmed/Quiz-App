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

const Topic = ({navigation}) => {
  return (
    <View style={styles.main}>
      <LinearGradient
        colors={['#7B6847','#7B6847',]}
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(100),
          //   borderBottomRightRadius: 30,
          //   borderBottomLeftRadius: 30,
        }}>
        <Animatable.View  animation={'slideInUp'}
        duration={2000} style={styles.topicView}>
          <TouchableOpacity
            style={styles.NextBtn}
            onPress={() => navigation.navigate('Quiz')}>
            <Text style={styles.NextText} allowFontScaling={false}>
              HTML
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NextBtn}
            onPress={() => navigation.navigate('CssQuiz')}>
            <Text style={styles.NextText} allowFontScaling={false}>
              CSS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NextBtn}
            onPress={() => navigation.navigate('JsQuiz')}>
            <Text style={styles.NextText} allowFontScaling={false}>
              JAVASCRIPT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NextBtn}
            onPress={() => navigation.navigate('ReactQuiz')}>
            <Text style={styles.NextText} allowFontScaling={false}>
              REACT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NextBtn}
            onPress={() => navigation.navigate('RN-Quiz')}>
            <Text style={styles.NextText} allowFontScaling={false}>
              REACT-NATIVE
            </Text>
          </TouchableOpacity>
        </Animatable.View>
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
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NextBtn: {
    width: responsiveWidth(100),
    height: responsiveHeight(7),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: responsiveWidth(90),
    height: responsiveHeight(7),
    marginVertical: responsiveHeight(2),
  },
  NextText: {
    // backgroundColor: 'white',
    color: '#7B6847',

    fontSize: responsiveFontSize(2.75),

    fontWeight: 500,
  },
});
