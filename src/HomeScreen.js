
import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, View} from 'react-native';
import {Text, Header, Icon} from 'react-native-elements';
import WebView from './components/Webview'
import {AppTheme} from './theme';
import {Toast} from '@ant-design/react-native'
import utils from './utils/MessageUtils'
import BasePageContainer from "./components/BasePageContainer";
import {getRequest,postRequest} from './utils/request'
const axios =require('axios')
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import {observer,inject} from 'mobx-react'
import {runInAction} from 'mobx'
type Props = {};

inject('account')
@observer
export default class HomeScreen extends BasePageContainer {
    static navigationOptions = ({ navigation }) => {
        return {
           header:null
        };
    };


    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.props.navigation.setParams({header: null})
}


getInfo=async()=>{
    let response = await getRequest('http://jsonplaceholder.typicode.com/users');
    console.log('responsezzz',response)
    return response
}

changePage = ()=>{
        this.props.navigation.navigate('DetailPageContainer',{title:'详情'})
    }

    componentDidMount(){
        let allTimeInfo = this.getAllTimeInfo();
        console.log('allTimeInfo',allTimeInfo)
    }

    getWebViewInfo = (width, height) =>{
        //传递给web
        utils.sendMsg({action:'INIT_DATA',paylod:{width,height}},this)

    }
    getSendMsg = (event) =>{
        utils.handleMsg(JSON.parse(event.nativeEvent.data))
    }


    getAllTimeInfo=()=>{
        let timeList=[]
        let todayHoursList = this.getTodayHoursList(); //今天的信息
        let tomoInfoList = this.getOtherInfo(); //明天
        let afterInfoList = this.getOtherInfo(); //后天
        timeList.push({value:'today',label:'今天',children:todayHoursList})
        timeList.push({value:'tomorrow',label:'明天',children:tomoInfoList})
        timeList.push({value:'after',label:'后天',children:afterInfoList})
        return timeList
    }
    getTodayHoursList=()=>{
        //获取今天的剩余小时数
        let date=new Date()
        let hours = date.getHours(); //当前的小时数字  0~23 点
        let useHour=hours

        let minutes = date.getMinutes(); //获取分钟数  0~50 分
        let useMinutes=minutes
        if(minutes>=50){
            //小时数应该加1 如果小时数已经达到最大 即 23 则保持不变
            if(hours<23){
                useHour+=1
                useMinutes=0
            }
        }else {
            useMinutes+=10
            let timestr=useMinutes+''
            let useStr = timestr[0]+'0';
            useMinutes = parseInt(useStr,10);
        }
        let AlloutList=[]
        for (let i=useHour;i<=23;i++){
            let outList=[]
            let outInfo={value:i,label:i+'点'}
            if(i!==useHour){
                useMinutes=0
            }
            for (let j=useMinutes;j<=50;j+=10){
                let innerInfo={value:useMinutes,label:j+'分'}
                outList.push(innerInfo)
            }
            outInfo.children=outList
            AlloutList.push(outInfo)

        }
        return AlloutList
    }

    getOtherInfo=()=>{
        let AlloutList=[]
        for (let i=0;i<=23;i++){
            let outList=[]
            let outInfo={value:i,label:i+'点'}
            for (let j=0;j<=50;j+=10){
                let innerInfo={value:j,label:j+'分'}
                outList.push(innerInfo)
            }
            outInfo.children=outList
            AlloutList.push(outInfo)

        }
        return AlloutList
    }


  render() {
        console.log('accountHome',this.props.account)
    return (
      <View style={AppTheme.pageContainer}>
        <Header
          leftComponent={<Icon name={'menu'} onPress={this.props.navigation.openDrawer} />}
          centerComponent={{text:'Home', style: {color: '#fff'}}}
          rightComponent={<Icon name={'announcement'} onPress={() => {
              // this.web.postMessage('_onLoadEnd from Rn')
            this.props.navigation.push('Detail')
            //   action,paylod,callbackId
            //   utils.sendMsg({action:'lala',paylod:{name:'xg',value:'哈赛'}},this)
            //   alert('ff')
            //   this.push('WebViewPageContainer',{url:'http://172.16.23.149:3000/home'})
            //   Toast.info('fffff')
            //   let data={userId:'Mobx',password:'面对疾风吧'}
            //   runInAction(()=>{
            //       this.props.account.testThings(data)
            //   })
            //   console.log('fdfdf')
          }}/>}
        />
          <Text style={{backgroundColor:'red'}}>{this.props.account&&this.props.account.userId||'lala'}</Text>
        <View style={styles.web_style}>
          <WebView
              style={styles.web_style}
              url={'http://172.16.23.149:3000/home'}
              ref={com=>this.web=com}
              onLoadEnd={({width, height})=>this.getWebViewInfo(width,height)}
              onMessage={(event)=>this.getSendMsg(event)}
          />

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    web_style:{
      flex:1,
        backgroundColor:'red'
    }
});