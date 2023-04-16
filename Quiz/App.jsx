import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {React, useState} from 'react';
import Questions from './Questions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenWidth,
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
  countingView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(35),
    height: responsiveHeight(5),
    color: 'white',
    backgroundColor: 'silver',
    marginTop: responsiveHeight(10),
    marginBottom: responsiveFontSize(3),
    marginLeft: responsiveWidth(3),
    // textAlign: 'center',
    // margin:20
  },
  countingText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    // textAlign: 'left',
  },
  questionView: {
    display: 'flex',
    alignSelf: 'center',
    width: responsiveWidth(100),
    backgroundColor: 'purple',
    // padding: 10,
    margin: 10,
    paddingHorizontal: responsiveWidth(4),
  },
  questionText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    lineHeight: 20,
    // textAlign: 'center',
    flexWrap: 'wrap',
  },
  optionView: {
    // backgroundColor: 'yellow',
    // marginTop: 20,
  },
  OPTION: {
    display: 'flex',
    alignSelf: 'center',
    // backgroundColor: 'silver',
    marginVertical:responsiveHeight(1.5)
  },
  nextView: {
    backgroundColor: 'pink',
    margin: 20,
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
          <TouchableOpacity onPress={NEXT}>
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
                  justifyContent:'space-between',
                  borderWidth: 2,
                  borderColor:
                    options == correctoption
                      ? 'green'
                      : options == currentoptionselected
                      ? 'red'
                      : 'black',
                      width: responsiveWidth(90),
                      height: responsiveHeight(7),
                  // textAlign: 'center',
                  paddingHorizontal:10
                  // textAlignVertical: 'center',
                }}
                onPress={() => handleselectedoption(options)}
                disabled={disableoption}
                key={options}>
                <Text
                  style={
                    {
                      fontSize: responsiveFontSize(2),
                      color:'white'
                      // marginTop: 5,
                    }
                  }>
                  {options}
                </Text>
                {options == correctoption ? (
                  <View
                    style={{
                      width: responsiveWidth(8),
                      height: responsiveHeight(4),
                      borderRadius: 14,
                      backgroundColor: 'green',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="check"
                      style={{color: 'white', fontSize: 18}}
                    />
                  </View>
                ) : options == currentoptionselected ? (
                  <View
                    style={{
                      width: responsiveWidth(8),
                      height: responsiveHeight(4),
                      borderRadius: 14,
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="close"
                      style={{color: 'white', fontSize: 18}}
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
      <View style={styles.countingView}>
        <Text style={styles.countingText}>Q.{currentquestion + 1}/</Text>
        <Text style={styles.countingText}>Q.{quesdata.length}</Text>
      </View>
      <View style={styles.questionView}>{renderingQuestions()}</View>
      <View style={styles.optionView}>{renderingoptions()}</View>
      <View style={styles.nextView}>{renderNextButton()}</View>
    </View>
  );
};

export default App;
