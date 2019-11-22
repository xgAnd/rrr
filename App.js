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
import {ThemeProvider, Header, Icon} from 'react-native-elements';
import AuthLoadingScreen from './src/AuthLoadingScreen';
import AuthScreen from './src/AuthScreen';
import MenuScreen from './src/MenuScreen';
import HomeScreen from './src/HomeScreen';
import SettingScreen from './src/SettingScreen';
import HelpScreen from './src/HelpScreen';
import DetailStack from './src/DetailStack';
import MainHeader from './src/components/MainHeader';


import { Button, Toast } from '@ant-design/react-native';
import {ElementsTheme} from './src/theme';
import WebViewPageContainer from "./src/WebViewPageContainer";
import BasePageContainer from "./src/components/BasePageContainer";
import {observer,Provider} from 'mobx-react'
import store from './src/model/Store'
// 应用界面组
const MyDrawerNavigator =createDrawerNavigator({
  Home: {
    screen: HomeScreen,

  },
  Settings: {
    screen: SettingScreen,

  },
  Help: {
    screen: HelpScreen,

  },
}, {
  drawerPosition: 'left',

  edgeWidth: 150,
  contentComponent: props => (<MenuScreen {...props}/>),
});

const MainStack = createStackNavigator({
  Home: {
    screen: MyDrawerNavigator,
  },
  Detail: {
    screen: DetailStack,
  },
    WebViewPageContainer:{
     screen:WebViewPageContainer
    },
    BasePageContainer:{
    screen:BasePageContainer
    }

}, {
  initialRouteName: 'Home',
    headerMode: 'none',
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