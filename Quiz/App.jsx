import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const [score, setscore] = useState(0);
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

export default App;
