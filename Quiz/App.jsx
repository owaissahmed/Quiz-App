import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {React, useState, useEffect} from 'react';
import Questions from './Questions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  main: {
    height: deviceheight,
    width: devicewidth,
    backgroundColor: '#2e2d4d',
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
    marginTop: responsiveHeight(2),
    marginBottom: responsiveFontSize(3),
    marginHorizontal: responsiveWidth(3),
    // textAlign: 'center',
    // margin:20
  },
  countingView: {
    backgroundColor: 'silver',
    padding: 8,
    alignSelf: 'center',
    width: responsiveWidth(45),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  TimerView: {
    backgroundColor: 'silver',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
    alignSelf: 'center',
    width: responsiveWidth(45),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  countingText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    // textAlign: 'center',
    // textAlign:'left'
    // textAlignVertical:'center'
  },
  questionView: {
    display: 'flex',
    alignSelf: 'center',
    width: responsiveWidth(100),
    // backgroundColor: 'purple',
    // padding: 10,
    // margin: 10,
    paddingHorizontal: responsiveWidth(4),
  },
  questionText: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    lineHeight: 20,
    // textAlign: 'center',
    flexWrap: 'wrap',
  },
  optionView: {
    backgroundColor: '#b49156',
    marginTop: responsiveHeight(2),
  },
  OPTION: {
    display: 'flex',
    alignSelf: 'center',
    // backgroundColor: 'silver',
    marginVertical: responsiveHeight(1),
  },
  nextView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  NextText: {
    width: responsiveWidth(100),
    height: responsiveHeight(7),
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  const quesdata = Questions;
  const [currentquestion, setcurrentquestion] = useState(0);
  const [currentoptionselected, setcurrentoptionselected] = useState(null);
  const [correctoption, setcorrectoption] = useState(null);
  const [disableoption, setdisableoption] = useState(false);
  const [next, setnext] = useState(false);
  const [score, setscore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100000);
  const [Qremain, setQremain] = useState(1);

  useEffect(() => {
    if (timeLeft === 0) {
      Alert.alert(`Time's up! Your score is ${score}`);

      setdisableoption(true);
      setnext(false);
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, score]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    });
    const seconds = (time % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    });
    return (
      <View>
        <Text style={styles.countingText}>
          {minutes}:{seconds}
        </Text>
      </View>
    );
  };
  const renderingQuestions = () => {
    return (
      <View>
        <View>
          <Text style={styles.questionText}>
            {quesdata[currentquestion]?.question}
          </Text>
        </View>
      </View>
    );
  };
  const NEXT = () => {
    if (currentquestion == quesdata.length - 1) {
      setnext(false);
      let Score = score;
      Alert.alert(Score.toString(), 'YOUR FORM HAS BEEN SUBMITTED');
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
          <TouchableOpacity onPress={NEXT}>
            <Text>Score</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity style={styles.NextText} onPress={NEXT}>
            <Text>Next</Text>
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
      setscore(score + 1);
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
                  height: responsiveHeight(7),
                  // textAlign: 'center',
                  paddingHorizontal: 10,
                  // textAlignVertical: 'center',
                }}
                onPress={() => handleselectedoption(options)}
                disabled={disableoption}
                key={options}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: 'white',
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
      <View
        style={{
          backgroundColor: 'white',
          width: responsiveWidth(100),
          height: responsiveHeight(55),
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
        }}>
        <Image
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(35),
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
          }}
          source={require('./back.jpg')}
        />
        <View style={styles.countingTimerView}>
          <View style={styles.countingView}>
            <Text style={styles.countingText}>
              Questions Left : 0{quesdata.length - currentquestion - Qremain}
            </Text>
          </View>
          <View style={styles.TimerView}>
            <Text style={styles.countingText}>Time To Go : </Text>
            <Text style={styles.countingText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
        <View style={styles.questionView}>{renderingQuestions()}</View>
      </View>
    
      <View style={styles.optionView}>{renderingoptions()}</View>
      <View style={styles.nextView}>{renderNextButton()}</View>
    </View>
  );
};

export default App;
// <View style={styles.scoreView}>
// <View>
//   <Text style={styles.countingText}>Score : {score}</Text>
// </View>
// <View style={styles.score}>
//   <MaterialCommunityIcons
//     name="cash-fast"
//     style={{color: 'green', fontSize: 18}}
//   />
// </View>
// </View>