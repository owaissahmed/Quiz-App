import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Image,
    ImageBackground,
    Button,
  } from 'react-native';
  import {React, useState, useEffect} from 'react';
//   import Questions from './Questions';
//   import CssQuestions from './CssQuestions';
// import CssQuestions from './CssQuestions';
// import CssQuestions from './CssQues';
import JsQuestions from './JsQuestions';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import LinearGradient from 'react-native-linear-gradient';
  import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';
  import Modal from 'react-native-modal';
  import * as Animatable from 'react-native-animatable';
  const devicewidth = Dimensions.get('window').width;
  const deviceheight = Dimensions.get('window').height;
  
  const styles = StyleSheet.create({
    main: {
      height: deviceheight,
      width: devicewidth,
      backgroundColor: 'white',
    },
    scoreView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // width: responsiveWidth(35),
      // height: responsiveHeight(5),
      color: 'white',
      backgroundColor: 'silver',
      marginTop: responsiveHeight(10),
      marginBottom: responsiveFontSize(3),
      marginHorizontal: responsiveWidth(3),
    },
    score: {
      alignSelf: 'center',
      alignContent: 'center',
      width: responsiveWidth(8),
      height: responsiveHeight(4),
      borderRadius: 14,
      // backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    countingTimerView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // width: responsiveWidth(35),
      // height: responsiveHeight(5),
      color: 'white',
      // backgroundColor: 'black',
      marginVertical: responsiveHeight(2),
      marginHorizontal: responsiveWidth(3),
      // textAlign: 'center',
      // margin:20
    },
    countingView: {
      backgroundColor: 'lightgray',
      paddingHorizontal: responsiveWidth(2.5),
      paddingVertical: responsiveHeight(0.5),
      alignSelf: 'center',
      width: responsiveWidth(45),
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    TimerView: {
      backgroundColor: 'lightgray',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      // padding: 8,
      paddingHorizontal: responsiveWidth(3),
      paddingVertical: responsiveHeight(0.5),
      alignSelf: 'center',
      width: responsiveWidth(45),
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    countingText: {
      color: '#7B6847',
      fontWeight: 500,
      fontSize: responsiveFontSize(2.25),
      // textAlign: 'center',
      // textAlign:'left'
      // textAlignVertical:'center'
    },
    questionView: {
      display: 'flex',
      alignSelf: 'center',
      justifyContent: 'center',
      width: responsiveWidth(95),
      backgroundColor: 'lightgray',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      textAlignVertical: 'center',
      // backgroundColor: 'purple',
      //   padding: 5,
      // margin: 10,
      //   marginHorizontal:responsiveWidth(3),
      // marginHorizontal:responsiveHeight(1),
      paddingHorizontal: responsiveWidth(2),
      paddingVertical: responsiveHeight(0.5),
    },
    questionText: {
      color: '#7B6847',
      fontWeight: 500,
      fontSize: responsiveFontSize(2.5),
      //   lineHeight: 20,
      alignContent: 'center',
      //   textAlign: 'center',
      //   backgroundColor: '#302917',
      flexWrap: 'wrap',
    },
    optionView: {
      // backgroundColor: '#302917',
      marginTop: responsiveHeight(1),
    },
    OPTION: {
      display: 'flex',
      alignSelf: 'center',
      // backgroundColor: 'silver',
      marginVertical: responsiveHeight(0.75),
    },
    nextView: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      // backgroundColor: 'red',
      alignItems: 'center',
    },
    NextBtn: {
      width: responsiveWidth(100),
      height: responsiveHeight(7),
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    CloseBtn: {
      width: responsiveWidth(100),
      height: responsiveHeight(7),
      // backgroundColor: 'brown',
      // alignContent:'flex-end',
      // alignSelf:'flex-end',
      justifyContent: 'center',
      // backgroundColor: 'red',
      alignItems: 'center',
    },
    CloseText: {
      color: '#7B6847',
      fontWeight: 500,
      fontSize: responsiveFontSize(3),
      marginVertical: responsiveHeight(1),
    },
    FinalScore: {
      color: '#7B6847',
      fontWeight: 500,
      fontSize: responsiveFontSize(6.5),
      marginVertical: responsiveHeight(1),
    },
    NextText: {
      color: '#7B6847',
      fontWeight: 500,
      fontSize: responsiveFontSize(2.5),
    },
    modalView: {
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      width: responsiveWidth(90),
      height: responsiveHeight(30),
      borderRadius: 20,
    },
  });
  
  const JsQuiz = ({navigation}) => {
    const quesdata = JsQuestions;
    const [currentquestion, setcurrentquestion] = useState(0);
    const [currentoptionselected, setcurrentoptionselected] = useState(null);
    const [correctoption, setcorrectoption] = useState(null);
    const [disableoption, setdisableoption] = useState(false);
    const [next, setnext] = useState(false);
    const [score, setscore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120);
    const [Qremain, setQremain] = useState(1);
    const [isModalVisible, setModalVisible] = useState(false);
  
    useEffect(() => {
      if (timeLeft === 0) {
        Alert.alert(`⚠️Time's up! Your score is ${score}`);
        navigation.navigate('Topic');
        setdisableoption(true);
        setnext(false);
      } else {
        const timer = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [timeLeft, score]);
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const closeModal = () => {
      setModalVisible(!isModalVisible);
      navigation.navigate('Topic');
      setcurrentquestion(0);
      setcurrentoptionselected(null);
      setcorrectoption(null);
      setdisableoption(false);
      setnext(false);
      setTimeLeft(1000);
      setscore(0);
    };
  
    const formatTime = time => {
      const minutes = Math.floor(time / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      });
      const seconds = (time % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      });
      return (
        <View>
          <Text allowFontScaling={false} style={styles.countingText}>
            {minutes}:{seconds}
          </Text>
        </View>
      );
    };
    const renderingQuestions = () => {
      return (
        <View>
          <View>
            <Text allowFontScaling={false} style={styles.questionText}>
              {quesdata[currentquestion]?.question}
            </Text>
          </View>
        </View>
      );
    };
    const NEXT = () => {
      if (currentquestion == quesdata.length - 1) {
        setnext(false);
      } else {
        setcurrentquestion(currentquestion + 1);
        setcurrentoptionselected(null);
        setcorrectoption(null);
        setdisableoption(false);
        setnext(false);
      }
    };
  
    const renderNextButton = () => {
      if (next) {
        if (currentquestion === quesdata.length - 1) {
          return (
            <View>
              <TouchableOpacity style={styles.NextBtn} onPress={toggleModal}>
                <Text allowFontScaling={false} style={styles.NextText}>
                  Score
                </Text>
              </TouchableOpacity>
              <Modal
                isVisible={isModalVisible}
                animationIn="zoomIn"
                animationOut="zoomOut"
                animationInTiming={500}
                animationOutTiming={500}
                backdropTransitionInTiming={500}
                backdropTransitionOutTiming={500}>
                <View style={styles.modalView}>
                  <Text allowFontScaling={false} style={styles.CloseText}>
                    Your Final Score Is
                  </Text>
                  <Text allowFontScaling={false} style={styles.FinalScore}>
                    {score}
                  </Text>
                  <TouchableOpacity style={styles.CloseBtn} onPress={closeModal}>
                    <Text allowFontScaling={false} style={styles.NextText}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          );
        } else {
          return (
            <TouchableOpacity style={styles.NextBtn} onPress={NEXT}>
              <Text allowFontScaling={false} style={styles.NextText}>
                Next
              </Text>
            </TouchableOpacity>
          );
        }
      } else {
        return null;
      }
    };
    const handleselectedoption = selected => {
      const correct_option = quesdata[currentquestion].ans;
      setcurrentoptionselected(selected);
      setcorrectoption(correct_option);
      setdisableoption(true);
  
      if (selected === correct_option) {
        setscore(score + 10);
      }
  
      setnext(true);
    };
    const renderingoptions = () => {
      return (
        <View>
          {quesdata[currentquestion]?.options.map((options, index) => (
            <View key={index}>
              <View style={styles.OPTION}>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderWidth: 2,
                    borderRadius: 10,
                    backgroundColor:
                      options == correctoption
                        ? '#4CAF50'
                        : options == currentoptionselected
                        ? '#E53935'
                        : 'transparent',
                    borderColor:
                      options == correctoption
                        ? '#4CAF50'
                        : options == currentoptionselected
                        ? '#E53935'
                        : 'black',
                    width: responsiveWidth(90),
                    height: responsiveHeight(6.5),
                    // textAlign: 'center',
                    paddingHorizontal: 10,
                    // textAlignVertical: 'center',
                  }}
                  onPress={() => handleselectedoption(options)}
                  disabled={disableoption}
                  key={options}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'black',
                      // marginTop: 5,
                    }}>
                    {options}
                  </Text>
                  {options == correctoption ? (
                    <View
                      style={{
                        width: responsiveWidth(8),
                        height: responsiveHeight(4),
                        borderRadius: 14,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="check"
                        style={{
                          color: '#4CAF50',
                          fontSize: responsiveFontSize(3),
                        }}
                      />
                    </View>
                  ) : options == currentoptionselected ? (
                    <View
                      style={{
                        width: responsiveWidth(8),
                        height: responsiveHeight(4),
                        borderRadius: 14,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="close"
                        style={{
                          color: '#E53935',
                          fontSize: responsiveFontSize(3),
                        }}
                      />
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      );
    };
  
    return (
      <View style={styles.main}>
        <View>
          <LinearGradient
            colors={['#7B6847', '#fff']}
            style={{
              width: responsiveWidth(100),
              height: responsiveHeight(100),
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
            }}>
            <Image
              style={{
                width: responsiveWidth(100),
                height: responsiveHeight(40),
                borderBottomRightRadius: 40,
                borderBottomLeftRadius: 40,
                alignSelf: 'center',
                // marginTop: 8,
              }}
              source={require('../back.jpg')}
            />
  
            <View style={styles.countingTimerView}>
              <View style={styles.countingView}>
                <Text allowFontScaling={false} style={styles.countingText}>
                  Questions Left : 0{quesdata.length - currentquestion - Qremain}
                </Text>
              </View>
  
              <View style={styles.TimerView}>
                <Text allowFontScaling={false} style={styles.countingText}>
                  Time To Go :{' '}
                </Text>
                <Text allowFontScaling={false} style={styles.countingText}>
                  {formatTime(timeLeft)}
                </Text>
              </View>
            </View>
            <View style={styles.questionView}>{renderingQuestions()}</View>
            <View style={styles.optionView}>{renderingoptions()}</View>
          </LinearGradient>
        </View>
        <View style={styles.nextView}>{renderNextButton()}</View>
      </View>
    );
  };
  
  export default JsQuiz;
  