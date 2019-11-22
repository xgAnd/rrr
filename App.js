/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView,View} from 'react-native';
import {createStackNavigator, createSwitchNavigator, createDrawerNavigator, createAppContainer} from "react-navigation";
import AuthLoadingScreen from './src/AuthLoadingScreen';
import AuthScreen from './src/AuthScreen';
import DetailStack from './src/DetailStack';

import {observer,Provider} from 'mobx-react'
import store from './src/model/Store'
// 应用界面组


const MainStack = createStackNavigator({
    Detail: {
        screen: DetailStack,
    },

});

const MySwitchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen, // 初始化，查询登录状态过程，loading
  App: MainStack, // 已登录的用户，进入应用界面
  Auth: AuthScreen, // 未登录，进入登录界面
}, {
  initialRouteName: 'AuthLoading',
});

const MyApp = createAppContainer(MainStack);

@observer
class App extends React.Component{
  render(){
    console.log('storestore',store)
      return (
          <View style={{flex: 1}}>
          <Provider {...store}>
              <MyApp />
          </Provider>
          </View>
      )
  }
}


export default App;