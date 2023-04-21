import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Quiz from './Quiz';
import Splash from './Splash';
import Topic from './Topic';
import CssQuiz from './CssQuiz';
import JsQuiz from './JsQuiz';
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          component={Splash}
          name="Splash"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Quiz}
          name="Quiz"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Topic}
          name="Topic"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={CssQuiz}
          name="CssQuiz"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={JsQuiz}
          name="JsQuiz"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
