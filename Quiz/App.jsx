import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {React, useState} from 'react';
import Questions from './Questions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const App = () => {
  const quesdata = Questions;
  const [currentquestion, setcurrentquestion] = useState(0);
  const [currentoptionselected, setcurrentoptionselected] = useState(null);
  const [correctoption, setcorrectoption] = useState(null);
  const [disableoption, setdisableoption] = useState(false);
  const [next, setnext] = useState(false);
  const [playagain, setplayagain] = useState(false);
  const [score, setscore] = useState(1);
  const renderingQuestions = () => {
    return (
      <View>
        <View>
          <Text>{quesdata[currentquestion]?.question}</Text>
          <Text>{quesdata[currentquestion]?.['ans']}</Text>
        </View>
      </View>
    );
  };
  const NEXT = () => {
    setdisableoption(false);
    setcurrentquestion(currentquestion + 1);
    setnext(false);
  };

  const renderNextButton = () => {
    if (next) {
      return (
        <TouchableOpacity onPress={NEXT}>
          <Text>Next</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  const playAgain = () => {
    if (playagain) {
      return (
        <TouchableOpacity onPress={NEXT}>
          <Text>Play Again</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
// let zero = 0
// console.log(zero.toString());
  // const Result = () => {
  //   setcurrentquestion(0);
  // };
  const handleselectedoption = selected => {
    let zero = 0
    // console.log(selected === quesdata[currentquestion].ans);
    const correct_option = quesdata[currentquestion].ans;
    setcurrentoptionselected(selected);
    setcorrectoption(correct_option);
    setdisableoption(true);
    if (currentoptionselected === correctoption) {
      console.log('true');
      setscore(zero + 1);
      console.log(score);
    }else{
      console.log('false');
      // setscore(score);
      console.log(score);
    }
    setnext(true);
    // setdisableoption(true);
    if (currentquestion !== 1) {
      // setcurrentquestion(currentquestion + 1);
    } else {
      // console.log(score);
      let Score = score;
      Alert.alert(Score.toString(), 'YOUR FORM HAS BEEN SUBMITTED');
      setnext(false);
      // console.log(score);
    }
  };

  const renderingoptions = () => {
    return (
      <View>
        {quesdata[currentquestion]?.options.map((options, index) => (
          <View key={index}>
            <View>
              <TouchableOpacity
                onPress={() => handleselectedoption(options)}
                disabled={disableoption}
                key={options}>
                <Text
                  style={{
                    marginTop: 5,
                    borderWidth: 2,
                    borderColor:
                      options == correctoption
                        ? 'green'
                        : options == currentoptionselected
                        ? 'red'
                        : 'black',
                    width: 265,
                    textAlign: 'center',
                    height: 80,
                    textAlignVertical: 'center',
                  }}>
                  {options}
                </Text>
                {options == correctoption ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      backgroundColor: 'green',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="check"
                      style={{
                        color: 'white',
                        fontSize: 20,
                      }}
                    />
                  </View>
                ) : options == currentoptionselected ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="close"
                      style={{
                        color: 'white',
                        fontSize: 20,
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
    <View>
      <View style={styles.counting}>
        <Text>{currentquestion + 1}/</Text>
        <Text>{quesdata.length}</Text>
      </View>
      <View>{renderingQuestions()}</View>
      <View>{renderingoptions()}</View>
      <View>{renderNextButton()}</View>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  counting: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
  },
  text: {
    color: 'white',
  },
});
// {currentquestion !== 3 && (
// <TouchableOpacity
//   style={{backgroundColor: 'grey', width: 50, marginLeft: 20}}
//   onPress={NEXT}>
//   <Text>NEXT</Text>
// </TouchableOpacity>
// )}
// <Icon name="cross" key={options} size={25} color="black" />
