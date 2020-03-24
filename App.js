import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import Drawer from './Drawer';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer/>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: "#fff",
      alignItems: 'center',
      justifyContent: 'center'
  }
});
